import {
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  deleteUser,
  doc,
  getDoc,
  getDocs,
  onAuthStateChanged,
  sendPasswordResetEmail,
  serverTimestamp,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "./firebase-setup.js";

const appApi = window.AB410_APP;
const allowedNames = ["Jama", "Ismail"];
const accountSlot = document.getElementById("account-slot");
let currentUser = null;
let currentProfile = null;
let activityDates = [];
let currentStreak = 0;
let longestStreak = 0;
let cohort = [];
let syncTimer = null;
let authMode = "signin";
let registrationInProgress = false;

if (!appApi) {
  throw new Error("AB-410 application API is unavailable.");
}

createAuthGate();
bindAuthEvents();
setSyncStatus("Connecting");

document.addEventListener("ab410:state-changed", () => {
  if (!currentUser) return;
  recordToday();
  scheduleSync();
});

document.addEventListener("ab410:rendered", (event) => {
  if (event.detail?.view === "dashboard") renderCohort();
});

onAuthStateChanged(auth, (user) => {
  if (!registrationInProgress) handleAuthState(user);
}, (error) => {
  showGate();
  setAuthError(readableAuthError(error));
});

async function handleAuthState(user) {
  currentUser = user;
  if (!user) {
    currentProfile = null;
    cohort = [];
    showGate();
    setSyncStatus("Sign in");
    return;
  }

  setSyncStatus("Loading");
  const legacyState = appApi.getState();
  appApi.setUserScope(user.uid);

  try {
    currentProfile = await ensureProfile(user);
    const progressRef = doc(db, "users", user.uid, "progress", "ab410");
    const progressSnap = await getDoc(progressRef);
    const localState = appApi.getState();

    if (progressSnap.exists()) {
      const remote = progressSnap.data();
      activityDates = Array.isArray(remote.activityDates) ? remote.activityDates : [];
      currentStreak = Number(remote.currentStreak) || 0;
      longestStreak = Number(remote.longestStreak) || 0;
      const remoteDate = remote.clientUpdatedAt || "";
      const localDate = localState?._meta?.updatedAt || "";
      if (remote.state && remoteDate >= localDate) {
        appApi.applyRemoteState(remote.state);
      }
    } else if (!hasProgress(localState) && hasProgress(legacyState) && !localStorage.getItem("ab410-migrated-" + user.uid)) {
      appApi.applyRemoteState(legacyState);
      localStorage.setItem("ab410-migrated-" + user.uid, "true");
    }

    recordToday();
    hideGate();
    renderAccount();
    await syncNow();
    await loadCohort();
  } catch (error) {
    console.error("Firebase startup failed", error);
    showGate();
    setAuthError("The learner record could not be loaded. Check the Firebase project configuration and try again.");
  }
}

function createAuthGate() {
  document.body.insertAdjacentHTML("beforeend", [
    '<div id="auth-gate" class="auth-gate" role="dialog" aria-modal="true" aria-labelledby="auth-title">',
      '<section class="auth-identity" aria-hidden="true">',
        '<div class="auth-crest">AB</div>',
        '<p class="eyebrow">AB-410 Academy</p>',
        '<h2>Learn with rigour.<br>Build with purpose.</h2>',
        '<p>One scholarly record for course mastery, practical labs, exam readiness, and daily momentum.</p>',
        '<div class="auth-principles">',
          '<span>Concepts</span><span>Application</span><span>Judgement</span>',
        '</div>',
      '</section>',
      '<section class="auth-panel">',
        '<div class="auth-heading">',
          '<p class="eyebrow">Learner record</p>',
          '<h2 id="auth-title">Welcome back</h2>',
          '<p id="auth-subtitle">Continue from your last study session.</p>',
        '</div>',
        '<div class="auth-tabs" role="tablist" aria-label="Account action">',
          '<button class="auth-tab active" type="button" role="tab" aria-selected="true" data-auth-mode="signin">Sign in</button>',
          '<button class="auth-tab" type="button" role="tab" aria-selected="false" data-auth-mode="register">Create account</button>',
        '</div>',
        '<form id="auth-form" class="auth-form">',
          '<fieldset id="profile-field" class="profile-field" hidden>',
            '<legend>Who is learning?</legend>',
            '<label><input type="radio" name="profile" value="Jama"><span><strong>Jama</strong><small>Healthcare lens</small></span></label>',
            '<label><input type="radio" name="profile" value="Ismail"><span><strong>Ismail</strong><small>Engineering lens</small></span></label>',
          '</fieldset>',
          '<label class="auth-field"><span>Email address</span><input id="auth-email" name="email" type="email" autocomplete="email" required></label>',
          '<label class="auth-field"><span>Password</span><input id="auth-password" name="password" type="password" autocomplete="current-password" minlength="6" required></label>',
          '<button class="auth-reset" type="button" data-reset-password>Forgot password?</button>',
          '<p id="auth-error" class="auth-error" role="alert"></p>',
          '<button id="auth-submit" class="auth-submit" type="submit">Sign in</button>',
        '</form>',
        '<p class="auth-footnote">Private progress is visible only to its learner. Shared comparison contains summary scores only.</p>',
      '</section>',
    '</div>'
  ].join(""));
}

function bindAuthEvents() {
  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
  });

  document.getElementById("auth-form").addEventListener("submit", submitAuth);
  document.querySelector("[data-reset-password]").addEventListener("click", resetPassword);

  accountSlot.addEventListener("click", async (event) => {
    if (!event.target.closest("[data-sign-out]")) return;
    setSyncStatus("Signing out");
    await signOut(auth);
  });
}

function setAuthMode(mode) {
  authMode = mode === "register" ? "register" : "signin";
  const registering = authMode === "register";
  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    const active = button.dataset.authMode === authMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.getElementById("profile-field").hidden = !registering;
  document.getElementById("auth-title").textContent = registering ? "Create your learner record" : "Welcome back";
  document.getElementById("auth-subtitle").textContent = registering
    ? "Choose a profile and keep every result in one place."
    : "Continue from your last study session.";
  document.getElementById("auth-submit").textContent = registering ? "Create account" : "Sign in";
  document.getElementById("auth-password").autocomplete = registering ? "new-password" : "current-password";
  setAuthError("");
}

async function submitAuth(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const email = form.email.value.trim();
  const password = form.password.value;
  const submit = document.getElementById("auth-submit");
  setAuthError("");
  submit.disabled = true;
  submit.textContent = authMode === "register" ? "Creating account..." : "Signing in...";

  try {
    if (authMode === "register") {
      const profileName = new FormData(form).get("profile");
      if (!allowedNames.includes(profileName)) {
        throw new Error("Choose Jama or Ismail before creating the account.");
      }
      registrationInProgress = true;
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const slot = await getDoc(doc(db, "learnerProgress", profileName.toLowerCase()));
      if (slot.exists() && slot.data().ownerUid !== credential.user.uid) {
        await deleteUser(credential.user);
        throw new Error(profileName + " already has a learner account. Sign in instead.");
      }
      await updateProfile(credential.user, { displayName: profileName });
      await setDoc(doc(db, "users", credential.user.uid), {
        displayName: profileName,
        email: credential.user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
      registrationInProgress = false;
      await handleAuthState(credential.user);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  } catch (error) {
    setAuthError(readableAuthError(error));
  } finally {
    registrationInProgress = false;
    submit.disabled = false;
    submit.textContent = authMode === "register" ? "Create account" : "Sign in";
  }
}

async function resetPassword() {
  const email = document.getElementById("auth-email").value.trim();
  if (!email) {
    setAuthError("Enter your email address first.");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    setAuthError("Password reset email sent.", "success");
  } catch (error) {
    setAuthError(readableAuthError(error));
  }
}

async function ensureProfile(user) {
  const profileRef = doc(db, "users", user.uid);
  const profileSnap = await getDoc(profileRef);
  const existing = profileSnap.exists() ? profileSnap.data() : {};
  const inferred = String(user.email || "").toLowerCase().includes("ismail") ? "Ismail" : "Jama";
  const displayName = allowedNames.includes(existing.displayName)
    ? existing.displayName
    : (allowedNames.includes(user.displayName) ? user.displayName : inferred);

  await setDoc(profileRef, {
    displayName,
    email: user.email || "",
    updatedAt: serverTimestamp()
  }, { merge: true });

  return { ...existing, displayName, email: user.email || "" };
}

function showGate() {
  document.body.classList.add("auth-pending");
  document.getElementById("auth-gate").hidden = false;
  accountSlot.innerHTML = '<span class="account-loading">Secure learner record</span>';
}

function hideGate() {
  document.body.classList.remove("auth-pending");
  document.getElementById("auth-gate").hidden = true;
}

function scheduleSync() {
  window.clearTimeout(syncTimer);
  setSyncStatus("Saving");
  syncTimer = window.setTimeout(syncNow, 700);
}

async function syncNow() {
  if (!currentUser || !currentProfile) return;
  const state = appApi.getState();
  const metrics = appApi.getMetrics();
  const streak = calculateStreak(activityDates);
  currentStreak = streak.current;
  longestStreak = Math.max(longestStreak, streak.longest);

  try {
    await Promise.all([
      setDoc(doc(db, "users", currentUser.uid, "progress", "ab410"), {
        state,
        activityDates,
        currentStreak,
        longestStreak,
        clientUpdatedAt: state?._meta?.updatedAt || new Date().toISOString(),
        updatedAt: serverTimestamp(),
        schemaVersion: 1
      }, { merge: true }),
      setDoc(doc(db, "learnerProgress", currentProfile.displayName.toLowerCase()), {
        ownerUid: currentUser.uid,
        displayName: currentProfile.displayName,
        lens: metrics.lens,
        readiness: metrics.readiness,
        completedModules: metrics.completedModules,
        totalModules: metrics.totalModules,
        completedLabs: metrics.completedLabs,
        totalLabs: metrics.totalLabs,
        averageQuiz: metrics.averageQuiz,
        practiceBest: metrics.practiceBest,
        currentStreak,
        longestStreak,
        updatedAt: serverTimestamp()
      }, { merge: true })
    ]);
    setSyncStatus("Saved");
    renderAccount();
  } catch (error) {
    console.error("Progress sync failed", error);
    setSyncStatus("Offline");
  }
}

async function loadCohort() {
  try {
    const snapshot = await getDocs(collection(db, "learnerProgress"));
    cohort = snapshot.docs
      .map((item) => ({ id: item.id, ...item.data() }))
      .filter((item) => allowedNames.includes(item.displayName))
      .sort((a, b) => allowedNames.indexOf(a.displayName) - allowedNames.indexOf(b.displayName));
    renderCohort();
  } catch (error) {
    console.error("Cohort summary failed", error);
    cohort = [];
    renderCohort();
  }
}

function renderAccount() {
  if (!currentUser || !currentProfile) return;
  const initial = escapeHtml(currentProfile.displayName.charAt(0));
  accountSlot.innerHTML = [
    '<div class="account-control">',
      '<span class="account-avatar" aria-hidden="true">', initial, '</span>',
      '<span class="account-copy"><strong>', escapeHtml(currentProfile.displayName), '</strong><small><span id="sync-state">Saved</span> | ', currentStreak, ' day streak</small></span>',
      '<button class="account-signout" type="button" data-sign-out title="Sign out">Sign out</button>',
    '</div>'
  ].join("");
}

function renderCohort() {
  const host = document.getElementById("cohort-progress");
  if (!host || !currentUser) return;

  const currentMetrics = appApi.getMetrics();
  const currentSummary = {
    id: currentProfile.displayName.toLowerCase(),
    ownerUid: currentUser.uid,
    displayName: currentProfile?.displayName || "Learner",
    currentStreak,
    readiness: currentMetrics.readiness,
    completedModules: currentMetrics.completedModules,
    totalModules: currentMetrics.totalModules,
    completedLabs: currentMetrics.completedLabs,
    totalLabs: currentMetrics.totalLabs,
    averageQuiz: currentMetrics.averageQuiz,
    lens: currentMetrics.lens
  };
  const summaries = cohort
    .filter((item) => item.ownerUid !== currentUser.uid)
    .concat(currentSummary)
    .sort((a, b) => allowedNames.indexOf(a.displayName) - allowedNames.indexOf(b.displayName));

  const cards = summaries.map((learner) => {
    const readiness = clamp(learner.readiness);
    const isCurrent = learner.ownerUid === currentUser.uid;
    const lens = learner.lens === "engineering" ? "Engineering" : "Healthcare";
    return [
      '<article class="learner-card', isCurrent ? ' current' : '', '">',
        '<div class="learner-card-head">',
          '<div><p class="eyebrow">', escapeHtml(lens), ' lens</p><h3>', escapeHtml(learner.displayName), '</h3></div>',
          isCurrent ? '<span class="you-mark">You</span>' : '',
        '</div>',
        '<div class="learner-readiness"><strong>', readiness, '%</strong><span>Exam readiness</span></div>',
        '<div class="meter learner-meter" aria-hidden="true"><span style="width:', readiness, '%"></span></div>',
        '<dl class="learner-stats">',
          '<div><dt>Lessons</dt><dd>', Number(learner.completedModules) || 0, '/', Number(learner.totalModules) || 0, '</dd></div>',
          '<div><dt>Labs</dt><dd>', Number(learner.completedLabs) || 0, '/', Number(learner.totalLabs) || 0, '</dd></div>',
          '<div><dt>Quiz avg.</dt><dd>', clamp(learner.averageQuiz), '%</dd></div>',
          '<div><dt>Streak</dt><dd>', Number(learner.currentStreak) || 0, ' days</dd></div>',
        '</dl>',
      '</article>'
    ].join("");
  }).join("");

  host.innerHTML = [
    '<div class="cohort-heading">',
      '<div><p class="eyebrow">Study fellowship</p><h2>Jama and Ismail</h2></div>',
      '<p>Independent records, shared momentum.</p>',
    '</div>',
    '<div class="learner-grid">', cards, '</div>'
  ].join("");
}

function recordToday() {
  const today = dateKey(new Date());
  activityDates = [...new Set([...activityDates, today])].sort();
  const streak = calculateStreak(activityDates);
  currentStreak = streak.current;
  longestStreak = Math.max(longestStreak, streak.longest);
}

function calculateStreak(dates) {
  const unique = [...new Set((dates || []).filter(Boolean))].sort();
  if (!unique.length) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let index = 1; index < unique.length; index += 1) {
    const gap = daysBetween(unique[index - 1], unique[index]);
    run = gap === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
  }

  const today = dateKey(new Date());
  const yesterday = dateKey(new Date(Date.now() - 86400000));
  const latest = unique[unique.length - 1];
  let current = latest === today || latest === yesterday ? 1 : 0;
  for (let index = unique.length - 1; current && index > 0; index -= 1) {
    if (daysBetween(unique[index - 1], unique[index]) !== 1) break;
    current += 1;
  }
  return { current, longest };
}

function daysBetween(from, to) {
  const first = new Date(from + "T12:00:00");
  const second = new Date(to + "T12:00:00");
  return Math.round((second - first) / 86400000);
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return [year, month, day].join("-");
}

function hasProgress(state) {
  if (!state) return false;
  return Object.keys(state.modules || {}).length > 0
    || Object.keys(state.quizzes || {}).length > 0
    || Object.values(state.labs || {}).some((lens) => Object.keys(lens || {}).length > 0)
    || Number(state.practice?.attempts) > 0;
}

function setSyncStatus(status) {
  const statusNode = document.getElementById("sync-state");
  if (statusNode) statusNode.textContent = status;
  if (!currentUser) {
    accountSlot.innerHTML = '<span class="account-loading">' + escapeHtml(status) + '</span>';
  }
}

function setAuthError(message, tone = "error") {
  const host = document.getElementById("auth-error");
  host.textContent = message || "";
  host.dataset.tone = message ? tone : "";
}

function readableAuthError(error) {
  const code = error?.code || "";
  const messages = {
    "auth/email-already-in-use": "That email already has an account. Sign in instead.",
    "auth/invalid-credential": "The email or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/user-not-found": "No learner account uses that email address.",
    "auth/too-many-requests": "Too many attempts. Wait a moment and try again.",
    "auth/weak-password": "Use a password with at least six characters.",
    "auth/network-request-failed": "Firebase could not be reached. Check the connection and try again.",
    "auth/operation-not-allowed": "Email sign-in is not enabled for this Firebase project."
  };
  return messages[code] || error?.message || "Authentication failed. Try again.";
}

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
