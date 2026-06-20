// Firebase-integrated App
import AuthManager from './auth.js';
import { AuthModal } from './auth-modal.js';
import ProgressSync from './progress-sync.js';
import ProgressDashboardRenderer from './progress-dashboard-renderer.js';

const data = window.AB410_DATA;
const storageKey = "ab410-academy-state-v1";
const appView = document.getElementById("app-view");

let state = loadState();
let currentView = state.ui?.view || "dashboard";
let activeModuleId = state.ui?.activeModuleId || data.modules[0].id;
let authManager = AuthManager;
let authModal = new AuthModal(authManager);
let progressSync = null;
let currentUser = null;

// Initialize
async function init() {
  try {
    // Initialize Firebase auth
    await authManager.init();

    // Listen for auth state changes
    authManager.onChange((user, profile) => {
      currentUser = user;
      if (user && profile) {
        progressSync = new ProgressSync(user.uid);
        // Load progress from Firestore
        loadRemoteProgress();
        showApp();
      } else {
        showAuthModal();
      }
    });

    // Check initial auth state
    if (!authManager.isAuthenticated()) {
      showAuthModal();
    } else {
      showApp();
    }
  } catch (error) {
    console.error('Initialization error:', error);
    // Fall back to local auth
    showAuthModal();
  }
}

function showAuthModal() {
  appView.innerHTML = '';
  authModal.open();
}

function showApp() {
  authModal.close();
  attachEventListeners();
  render();
}

async function loadRemoteProgress() {
  if (!progressSync) return;
  try {
    const remoteState = await progressSync.loadProgress();
    if (remoteState) {
      state = { ...state, ...remoteState };
    }
  } catch (error) {
    console.error('Error loading remote progress:', error);
  }
}

async function saveRemoteProgress() {
  if (!progressSync || !currentUser) return;
  try {
    await progressSync.saveProgress(state);
    await progressSync.updateStats(calculateStats());
  } catch (error) {
    console.error('Error saving remote progress:', error);
  }
}

function defaultState() {
  return {
    modules: {},
    quizzes: {},
    labs: {},
    practice: {
      attempts: 0,
      best: 0,
      lastScore: null,
      lastAnswers: {},
      domain: "all",
      set: []
    },
    wrongConcepts: {},
    ui: {
      view: "dashboard",
      activeModuleId: data.modules[0].id,
      lens: "healthcare",
      courseSearch: "",
      courseDomain: "all"
    }
  };
}

function loadState() {
  const defaults = defaultState();
  try {
    const loaded = JSON.parse(localStorage.getItem(storageKey) || "{}");
    const labsAreFlat = loaded.labs && Object.keys(loaded.labs).some((key) => key.startsWith("lab-"));
    return {
      ...defaults,
      ...loaded,
      modules: { ...defaults.modules, ...(loaded.modules || {}) },
      quizzes: { ...defaults.quizzes, ...(loaded.quizzes || {}) },
      labs: labsAreFlat
        ? { healthcare: loaded.labs, engineering: {} }
        : { healthcare: {}, engineering: {}, ...(loaded.labs || {}) },
      practice: { ...defaults.practice, ...(loaded.practice || {}) },
      wrongConcepts: { ...defaults.wrongConcepts, ...(loaded.wrongConcepts || {}) },
      ui: { ...defaults.ui, ...(loaded.ui || {}) }
    };
  } catch {
    return defaults;
  }
}

function saveState() {
  state.ui.view = currentView;
  state.ui.activeModuleId = activeModuleId;
  localStorage.setItem(storageKey, JSON.stringify(state));
  // Sync to Firestore
  saveRemoteProgress();
}

function calculateStats() {
  const modules = Object.values(state.modules || {});
  const quizzes = Object.values(state.quizzes || {});
  const labs = Object.values(state.labs || {});
  const practice = state.practice || {};

  return {
    modulesCompleted: modules.filter(m => m?.completed).length,
    quizzesCompleted: quizzes.filter(q => q?.completed).length,
    labsCompleted: labs.filter(l => l?.completed).length,
    practiceAttempts: practice.attempts || 0,
    bestPracticeScore: practice.best || 0,
    examReadiness: Math.round(
      ((modules.filter(m => m?.completed).length +
        quizzes.filter(q => q?.completed).length +
        labs.filter(l => l?.completed).length) /
       (modules.length + quizzes.length + labs.length || 1)) * 100
    )
  };
}

function attachEventListeners() {
  document.addEventListener("click", handleClick);
  document.addEventListener("change", handleChange);
  document.addEventListener("input", handleInput);

  const resetBtn = document.getElementById("reset-progress");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const ok = window.confirm("Reset all local progress for this course?");
      if (!ok) return;
      state = defaultState();
      saveState();
      activeModuleId = data.modules[0].id;
      currentView = "dashboard";
      render();
    });
  }
}

function handleClick(event) {
  const lensButton = event.target.closest(".lens-button[data-lens]");
  if (lensButton) {
    state.ui.lens = lensButton.dataset.lens;
    saveState();
    render();
    return;
  }

  const tab = event.target.closest("[data-view]");
  if (tab) {
    currentView = tab.dataset.view;
    saveState();
    render();
    return;
  }

  const moduleButton = event.target.closest("[data-module-id]");
  if (moduleButton) {
    activeModuleId = moduleButton.dataset.moduleId;
    currentView = "course";
    saveState();
    render();
    return;
  }

  // Continue with other click handlers from original app.js...
  handleViewClick(event);
}

function handleChange(event) {
  // Handle module completion
  if (event.target.name === "module-complete") {
    const moduleId = event.target.dataset.moduleId;
    if (event.target.checked) {
      state.modules[moduleId] = {
        ...state.modules[moduleId],
        completed: true,
        completedAt: Date.now()
      };
    } else {
      state.modules[moduleId] = {
        ...state.modules[moduleId],
        completed: false
      };
    }
    saveState();
    render();
    return;
  }

  // Continue with other change handlers...
  handleStateChange(event);
}

function handleInput(event) {
  // Handle search and filter inputs
  const searchInput = event.target.closest("[data-search]");
  if (searchInput) {
    state.ui.courseSearch = searchInput.value;
    render();
    return;
  }
}

function render() {
  // Render progress dashboard if it's the dashboard view
  if (currentView === "dashboard" && authManager.isAuthenticated()) {
    const dashRenderer = new ProgressDashboardRenderer(state, authManager.getUserProfile());
    appView.innerHTML = dashRenderer.render();
    return;
  }

  // Fall back to original rendering
  renderOriginalView();
}

function renderOriginalView() {
  // This is where the original app.js rendering logic goes
  // For now, showing a placeholder
  appView.innerHTML = `
    <div class="empty-state">
      <p>Loading content...</p>
    </div>
  `;
}

function handleViewClick(event) {
  // Original click handlers
}

function handleStateChange(event) {
  // Original change handlers
}

// Start the app
init();
