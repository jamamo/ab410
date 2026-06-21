const data = window.AB410_DATA;
const storageKey = "ab410-academy-state-v1";
const appView = document.getElementById("app-view");
let activeStorageKey = storageKey;

let state = loadState();
let currentView = state.ui.view || "dashboard";
let activeModuleId = state.ui.activeModuleId || data.modules[0].id;

document.addEventListener("click", handleClick);
document.addEventListener("change", handleChange);
document.addEventListener("input", handleInput);
document.getElementById("reset-progress").addEventListener("click", () => {
  const ok = window.confirm("Reset all local progress for this course?");
  if (!ok) return;
  state = defaultState();
  saveState();
  activeModuleId = data.modules[0].id;
  currentView = "dashboard";
  render();
});

render();

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

function loadState(key = activeStorageKey) {
  const defaults = defaultState();
  try {
    const loaded = JSON.parse(localStorage.getItem(key) || "{}");
    return normalizeState(loaded, defaults);
  } catch {
    return defaults;
  }
}

function normalizeState(loaded = {}, defaults = defaultState()) {
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
}

function saveState({ emit = true } = {}) {
  state.ui.view = currentView;
  state.ui.activeModuleId = activeModuleId;
  state._meta = { ...(state._meta || {}), updatedAt: new Date().toISOString() };
  localStorage.setItem(activeStorageKey, JSON.stringify(state));
  if (emit) {
    document.dispatchEvent(new CustomEvent("ab410:state-changed", {
      detail: { state: getStateSnapshot(), metrics: getMetrics() }
    }));
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

  const completeButton = event.target.closest("[data-complete-module]");
  if (completeButton) {
    const id = completeButton.dataset.completeModule;
    state.modules[id] = { complete: !isModuleComplete(id), completedAt: new Date().toISOString() };
    saveState();
    render();
    return;
  }

  const quizButton = event.target.closest("[data-submit-quiz]");
  if (quizButton) {
    submitModuleQuiz(quizButton.dataset.submitQuiz);
    return;
  }

  const practiceButton = event.target.closest("[data-new-practice]");
  if (practiceButton) {
    state.practice.set = makePracticeSet(state.practice.domain);
    state.practice.lastScore = null;
    state.practice.lastAnswers = {};
    saveState();
    render();
    return;
  }

  const practiceSubmit = event.target.closest("[data-submit-practice]");
  if (practiceSubmit) {
    submitPractice();
    return;
  }

  const labAll = event.target.closest("[data-lab-all]");
  if (labAll) {
    const lab = labById(labAll.dataset.labAll);
    const themed = themedLab(lab);
    const done = labProgress(lab).percent < 100;
    const labState = lensLabState();
    labState[lab.id] = {};
    themed.checkpoints.forEach((_, index) => {
      labState[lab.id][index] = done;
    });
    saveState();
    render();
  }
}

function handleChange(event) {
  const labCheck = event.target.closest("[data-lab-check]");
  if (labCheck) {
    const [labId, index] = labCheck.dataset.labCheck.split(":");
    const labState = lensLabState();
    labState[labId] ||= {};
    labState[labId][index] = labCheck.checked;
    saveState();
    render();
    return;
  }

  if (event.target.id === "course-domain") {
    state.ui.courseDomain = event.target.value;
    saveState();
    renderCourse();
    return;
  }

  if (event.target.id === "practice-domain") {
    state.practice.domain = event.target.value;
    state.practice.set = makePracticeSet(event.target.value);
    state.practice.lastScore = null;
    state.practice.lastAnswers = {};
    saveState();
    render();
  }
}

function handleInput(event) {
  if (event.target.id === "course-search") {
    state.ui.courseSearch = event.target.value;
    saveState();
    renderCourse();
  }
}

function render() {
  renderLensSwitch();
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === currentView);
  });

  if (currentView === "dashboard") renderDashboard();
  if (currentView === "course") renderCourse();
  if (currentView === "labs") renderLabs();
  if (currentView === "practice") renderPractice();
  if (currentView === "playbook") renderPlaybook();
  document.dispatchEvent(new CustomEvent("ab410:rendered", {
    detail: { view: currentView, metrics: getMetrics() }
  }));
}

function renderLensSwitch() {
  const lensId = activeLensId();
  document.body.dataset.lens = lensId;
  document.querySelectorAll(".lens-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lens === lensId);
  });
}

function renderDashboard() {
  const lens = activeLens();
  const readiness = readinessScore();
  const next = nextRecommendation();
  const layers = lens.layers || data.architecture;
  const domainCards = data.domains.map((domain) => {
    const score = domainScore(domain.id);
    return `
      <article class="metric-card">
        <div class="metric-topline">
          <span>${escapeHtml(domain.label)}</span>
          <strong>${score}%</strong>
        </div>
        <h3>${escapeHtml(domain.title)}</h3>
        <p>${escapeHtml(domain.summary)}</p>
        ${meter(score)}
      </article>
    `;
  }).join("");

  appView.innerHTML = `
    <section class="dashboard-grid">
      <article class="hero-panel">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(data.course.code)} / ${escapeHtml(lens.label)} lens / Pass mark ${escapeHtml(data.course.passMark)}</p>
          <h2>${escapeHtml(data.course.title)}</h2>
          <p>${escapeHtml(lens.tagline)}</p>
          <div class="hero-actions">
            <button class="primary-button" type="button" data-module-id="${escapeAttr(next.moduleId)}">${escapeHtml(next.action)}</button>
            <button class="secondary-button" type="button" data-view="practice">Practice Scenarios</button>
          </div>
        </div>
        <div class="readiness-panel" aria-label="Exam readiness">
          <span class="readiness-number">${readiness}%</span>
          <span class="readiness-label">Exam readiness</span>
          ${meter(readiness)}
          <p>${escapeHtml(readinessMessage(readiness))}</p>
        </div>
      </article>

      <section class="stat-row" aria-label="Progress summary">
        ${statCard("Lessons studied", `${completedModuleCount()}/${data.modules.length}`, "Concept coverage")}
        ${statCard("Labs complete", `${completedLabCount()}/${data.labs.length}`, "Hands-on build")}
        ${statCard("Average quiz", `${averageQuizScore()}%`, "Knowledge checks")}
        ${statCard("Practice best", `${state.practice.best || 0}%`, "Scenario stamina")}
      </section>

      <section id="cohort-progress" class="cohort-progress" aria-label="Learner progress"></section>

      <section class="content-band split-band">
        <article>
          <p class="eyebrow">${escapeHtml(lens.learner)}'s masterwork</p>
          <h2>${escapeHtml(lens.masterwork)}</h2>
          <p>${escapeHtml(lens.scenario)}</p>
          <div class="layer-stack">
            ${layers.map((item) => `
              <div class="layer-item">
                <strong>${escapeHtml(item.layer)}</strong>
                <span>${escapeHtml(item.description)}</span>
              </div>
            `).join("")}
          </div>
        </article>
        <figure class="architecture-figure">
          <img src="assets/ab410-architecture.svg" alt="${escapeAttr(lens.masterwork)} architecture from foundation to governance.">
        </figure>
      </section>

      <section class="domain-grid">
        ${domainCards}
      </section>

      <section class="content-band">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Next best move</p>
            <h2>${escapeHtml(next.title)}</h2>
          </div>
          <span class="status-pill">${escapeHtml(next.kind)}</span>
        </div>
        <p>${escapeHtml(next.reason)}</p>
        <div class="action-strip">
          <button class="primary-button" type="button" data-module-id="${escapeAttr(next.moduleId)}">${escapeHtml(next.action)}</button>
          <button class="secondary-button" type="button" data-view="labs">Review Labs</button>
          <button class="secondary-button" type="button" data-view="playbook">Open Playbook</button>
        </div>
      </section>
    </section>
  `;
}

function renderCourse() {
  currentView = "course";
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === "course");
  });

  const filteredModules = filteredCourseModules();
  const active = moduleById(activeModuleId) || filteredModules[0] || data.modules[0];
  activeModuleId = active.id;

  const moduleList = filteredModules.length
    ? filteredModules.map((module) => moduleRailItem(module, module.id === active.id)).join("")
    : document.getElementById("empty-state-template").innerHTML;

  appView.innerHTML = `
    <section class="course-layout">
      <aside class="course-rail">
        <div class="rail-controls">
          <label class="field-label" for="course-search">Search</label>
          <input id="course-search" class="text-field" type="search" value="${escapeAttr(state.ui.courseSearch || "")}" placeholder="Dataverse, prompt, flow">
          <label class="field-label" for="course-domain">Domain</label>
          <select id="course-domain" class="select-field">
            <option value="all"${state.ui.courseDomain === "all" ? " selected" : ""}>All</option>
            ${data.domains.map((domain) => `<option value="${escapeAttr(domain.id)}"${state.ui.courseDomain === domain.id ? " selected" : ""}>${escapeHtml(domain.label)}</option>`).join("")}
            <option value="orientation"${state.ui.courseDomain === "orientation" ? " selected" : ""}>Orientation</option>
          </select>
        </div>
        <div class="module-list" aria-label="Lessons">
          ${moduleList}
        </div>
      </aside>
      <article class="lesson-panel">
        ${renderLesson(active)}
      </article>
    </section>
  `;
}

function renderLesson(module) {
  const relatedLabs = module.labIds.map(labById).filter(Boolean);
  const quiz = state.quizzes[module.id] || {};
  const best = quiz.best || 0;
  const complete = isModuleComplete(module.id);
  const domain = domainById(module.domain);
  const moduleProgress = moduleMastery(module);

  return `
    <div class="lesson-header">
      <div>
        <p class="eyebrow">${domain ? escapeHtml(domain.label) + " / " + escapeHtml(domain.weight) : "Course Orientation"}</p>
        <h2>${escapeHtml(lensText(module.title))}</h2>
        <p>${escapeHtml(lensText(module.summary))}</p>
      </div>
      <div class="lesson-score">
        <strong>${moduleProgress}%</strong>
        <span>Mastery</span>
        ${meter(moduleProgress)}
      </div>
    </div>

    <div class="lesson-meta">
      <span>${escapeHtml(module.time)}</span>
      <span>${escapeHtml(module.difficulty)}</span>
      <span>Quiz best ${best}%</span>
      <span>${complete ? "Studied" : "Open"}</span>
    </div>

    ${renderLensNote(module)}

    <section class="lesson-section">
      <h3>Outcomes</h3>
      ${list(module.outcomes.map(lensText))}
    </section>

    <section class="lesson-section concept-grid">
      ${conceptCard("Core idea", lensText(module.coreIdea))}
      ${conceptCard("Why it exists", lensText(module.whyItExists))}
      ${conceptCard("Mental model", lensText(module.mentalModel))}
      ${conceptCard("Misconception", lensText(module.misconception))}
      ${conceptCard("Exam trigger", lensText(module.examTip))}
    </section>

    <section class="lesson-section">
      <h3>Topics</h3>
      <div class="topic-cloud">
        ${module.topics.map((topic) => `<span>${escapeHtml(lensText(topic))}</span>`).join("")}
      </div>
    </section>

    ${renderExpandedReference(module)}

    ${relatedLabs.length ? `
      <section class="lesson-section">
        <h3>Linked labs</h3>
        <div class="linked-labs">
          ${relatedLabs.map((lab) => {
            const progress = labProgress(lab);
            const themed = themedLab(lab);
            return `
              <article class="linked-lab">
                <span>Lab ${escapeHtml(lab.number)}</span>
                <strong>${escapeHtml(themed.title)}</strong>
                ${meter(progress.percent)}
              </article>
            `;
          }).join("")}
        </div>
      </section>
    ` : ""}

    <section class="lesson-section quiz-panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Knowledge check</p>
          <h3>${escapeHtml(module.shortTitle)} mastery check</h3>
        </div>
        <span class="status-pill">Best ${best}%</span>
      </div>
      ${renderModuleQuiz(module)}
    </section>

    <div class="sticky-actions">
      <button class="${complete ? "secondary-button" : "primary-button"}" type="button" data-complete-module="${escapeAttr(module.id)}">${complete ? "Mark Not Studied" : "Mark Studied"}</button>
      <button class="secondary-button" type="button" data-view="labs">Open Labs</button>
      <button class="secondary-button" type="button" data-view="practice">Practice</button>
    </div>
  `;
}

function renderLabs() {
  const lens = activeLens();
  const groups = data.domains.map((domain) => {
    const labs = data.labs.filter((lab) => lab.domain === domain.id);
    return `
      <section class="content-band">
        <div class="section-heading">
          <div>
            <p class="eyebrow">${escapeHtml(domain.label)} / ${escapeHtml(domain.weight)}</p>
            <h2>${escapeHtml(domain.title)}</h2>
          </div>
          <span class="status-pill">${domainLabProgress(domain.id)}% complete</span>
        </div>
        <div class="lab-grid">
          ${labs.map(renderLabCard).join("")}
        </div>
      </section>
    `;
  }).join("");

  appView.innerHTML = `
    <section class="page-stack">
      <section class="page-intro">
        <p class="eyebrow">${escapeHtml(lens.label)} masterwork labs</p>
        <h2>Build the ${escapeHtml(lens.masterwork)}</h2>
        <p>${escapeHtml(lens.labIntro)}</p>
      </section>
      ${groups}
    </section>
  `;
}

function renderPractice() {
  if (!state.practice.set.length) {
    state.practice.set = makePracticeSet(state.practice.domain);
    saveState();
  }

  const questions = practiceQuestionsByIds(state.practice.set);
  const lastScore = state.practice.lastScore;
  const weakConcepts = topWrongConcepts();

  appView.innerHTML = `
    <section class="practice-layout">
      <aside class="practice-sidebar">
        <div class="metric-card">
          <span class="metric-label">Practice best</span>
          <strong class="large-number">${state.practice.best || 0}%</strong>
          ${meter(state.practice.best || 0)}
          <p>${state.practice.attempts || 0} attempts</p>
        </div>
        <div class="control-card">
          <label class="field-label" for="practice-domain">Question domain</label>
          <select id="practice-domain" class="select-field">
            <option value="all"${state.practice.domain === "all" ? " selected" : ""}>All domains</option>
            ${data.domains.map((domain) => `<option value="${escapeAttr(domain.id)}"${state.practice.domain === domain.id ? " selected" : ""}>${escapeHtml(domain.label)}</option>`).join("")}
          </select>
          <button class="secondary-button full-width" type="button" data-new-practice="true">New Set</button>
        </div>
        <div class="control-card">
          <h3>Repair queue</h3>
          ${weakConcepts.length ? `<ul class="compact-list">${weakConcepts.map(([name, count]) => `<li><span>${escapeHtml(name)}</span><strong>${count}</strong></li>`).join("")}</ul>` : "<p>No recurring weak concepts yet.</p>"}
        </div>
      </aside>
      <section class="practice-main">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Scenario trainer</p>
            <h2>${questions.length}-question set</h2>
          </div>
          ${lastScore === null ? "" : `<span class="status-pill">Last ${lastScore}%</span>`}
        </div>
        <div class="question-stack">
          ${questions.map((item, index) => renderQuestion(item, index, "practice", state.practice.lastAnswers, Boolean(state.practice.lastScore !== null))).join("")}
        </div>
        <div class="sticky-actions">
          <button class="primary-button" type="button" data-submit-practice="true">Submit Practice</button>
          <button class="secondary-button" type="button" data-new-practice="true">New Set</button>
        </div>
      </section>
    </section>
  `;
}

function renderPlaybook() {
  appView.innerHTML = `
    <section class="page-stack">
      <section class="page-intro">
        <p class="eyebrow">Exam Playbook</p>
        <h2>${escapeHtml(data.course.principle)}</h2>
        <p>This is the compression layer: decision tables, study weeks, and the exam-room moves that decide scenario questions.</p>
      </section>

      <section class="playbook-grid">
        ${data.decisionTables.map((table) => `
          <article class="decision-card">
            <h3>${escapeHtml(table.title)}</h3>
            <dl>
              ${table.rows.map(([need, answer]) => `
                <div>
                  <dt>${escapeHtml(need)}</dt>
                  <dd>${escapeHtml(answer)}</dd>
                </div>
              `).join("")}
            </dl>
          </article>
        `).join("")}
      </section>

      <section class="content-band">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Five-week ascent</p>
            <h2>Two hours per day</h2>
          </div>
        </div>
        <div class="timeline">
          ${data.studyPlan.map((week) => `
            <article class="timeline-item">
              <span>${escapeHtml(week.week)}</span>
              <h3>${escapeHtml(week.title)}</h3>
              <p>${escapeHtml(week.focus)}</p>
              <strong>${escapeHtml(week.labs)}</strong>
              <small>${escapeHtml(week.target)}</small>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="content-band">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Exam room</p>
            <h2>Operating rules</h2>
          </div>
        </div>
        ${list(data.examTactics)}
      </section>
    </section>
  `;
}

function renderLabCard(lab) {
  const themed = themedLab(lab);
  const progress = labProgress(lab);
  return `
    <article class="lab-card">
      <div class="lab-header">
        <span>Lab ${escapeHtml(lab.number)}</span>
        <strong>${progress.percent}%</strong>
      </div>
      <h3>${escapeHtml(themed.title)}</h3>
      <p>${escapeHtml(themed.objective)}</p>
      <div class="lab-build">${escapeHtml(themed.build)}</div>
      ${meter(progress.percent)}
      <div class="checklist">
        ${themed.checkpoints.map((checkpoint, index) => {
          const checked = Boolean(lensLabState()[lab.id]?.[index]);
          return `
            <label>
              <input type="checkbox" ${checked ? "checked" : ""} data-lab-check="${escapeAttr(lab.id)}:${index}">
              <span>${escapeHtml(checkpoint)}</span>
            </label>
          `;
        }).join("")}
      </div>
      <div class="lab-footer">
        <small>${escapeHtml(themed.examAnchor)}</small>
        <button class="secondary-button compact" type="button" data-lab-all="${escapeAttr(lab.id)}">${progress.percent === 100 ? "Clear" : "Complete"}</button>
      </div>
    </article>
  `;
}

function renderModuleQuiz(module) {
  const quiz = state.quizzes[module.id] || {};
  const answers = quiz.lastAnswers || {};
  const showResults = typeof quiz.lastScore === "number";
  return `
    <div class="question-stack">
      ${module.masteryChecks.map((question, index) => renderQuestion({ ...question, id: `${module.id}:${index}` }, index, `quiz-${module.id}`, answers, showResults)).join("")}
    </div>
    <button class="primary-button" type="button" data-submit-quiz="${escapeAttr(module.id)}">Submit Check</button>
  `;
}

function renderQuestion(item, index, groupPrefix, answers, showResults) {
  const themed = themedQuestion(item);
  const selected = Number.isInteger(answers[themed.id]) ? answers[themed.id] : null;
  const correct = selected === themed.answer;
  return `
    <article class="question-card ${showResults ? (correct ? "correct" : "incorrect") : ""}">
      <h3><span>Q${index + 1}</span>${escapeHtml(themed.question)}</h3>
      <div class="option-list">
        ${themed.options.map((option, optionIndex) => {
          const id = `${groupPrefix}-${index}-${optionIndex}`;
          const checked = selected === optionIndex ? " checked" : "";
          return `
            <label for="${escapeAttr(id)}" class="${showResults && optionIndex === item.answer ? "answer-key" : ""}">
              <input id="${escapeAttr(id)}" type="radio" name="${escapeAttr(groupPrefix)}-${index}" value="${optionIndex}" data-question-id="${escapeAttr(themed.id)}"${checked}>
              <span>${escapeHtml(option)}</span>
            </label>
          `;
        }).join("")}
      </div>
      ${showResults ? `<p class="explanation"><strong>${correct ? "Correct." : "Repair."}</strong> ${escapeHtml(themed.explanation)}</p>` : ""}
    </article>
  `;
}

function submitModuleQuiz(moduleId) {
  const module = moduleById(moduleId);
  const answers = {};
  let correct = 0;
  module.masteryChecks.forEach((question, index) => {
    const checked = document.querySelector(`input[name="quiz-${cssEscape(moduleId)}-${index}"]:checked`);
    const answer = checked ? Number(checked.value) : -1;
    const id = `${moduleId}:${index}`;
    answers[id] = answer;
    if (answer === question.answer) {
      correct += 1;
    } else {
      state.wrongConcepts[question.concept] = (state.wrongConcepts[question.concept] || 0) + 1;
    }
  });
  const score = Math.round((correct / module.masteryChecks.length) * 100);
  const previous = state.quizzes[moduleId] || { attempts: 0, best: 0 };
  state.quizzes[moduleId] = {
    attempts: previous.attempts + 1,
    best: Math.max(previous.best || 0, score),
    lastScore: score,
    lastAnswers: answers,
    completedAt: new Date().toISOString()
  };
  if (score >= 80) {
    state.modules[moduleId] = { complete: true, completedAt: new Date().toISOString() };
  }
  saveState();
  render();
}

function submitPractice() {
  const questions = practiceQuestionsByIds(state.practice.set);
  const answers = {};
  let correct = 0;
  questions.forEach((question, index) => {
    const checked = document.querySelector(`input[name="practice-${index}"]:checked`);
    const answer = checked ? Number(checked.value) : -1;
    answers[question.id] = answer;
    if (answer === question.answer) {
      correct += 1;
    } else {
      state.wrongConcepts[question.concept] = (state.wrongConcepts[question.concept] || 0) + 1;
    }
  });
  const score = Math.round((correct / questions.length) * 100);
  state.practice.attempts += 1;
  state.practice.best = Math.max(state.practice.best || 0, score);
  state.practice.lastScore = score;
  state.practice.lastAnswers = answers;
  saveState();
  render();
}

function statCard(label, value, note) {
  return `
    <article class="stat-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(note)}</small>
    </article>
  `;
}

function conceptCard(title, text) {
  return `
    <article class="concept-card">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(text)}</p>
    </article>
  `;
}

function renderLensNote(module) {
  const lens = activeLens();
  const note = lens.moduleLens?.[module.id];
  if (!note) return "";
  return `
    <section class="lens-note">
      <div>
        <p class="eyebrow">${escapeHtml(lens.label)} lens</p>
        <h3>${escapeHtml(note.title)}</h3>
      </div>
      <p>${escapeHtml(note.scenario)}</p>
      <strong>${escapeHtml(note.memory)}</strong>
    </section>
  `;
}

function renderExpandedReference(module) {
  const deepDives = module.deepDives || [];
  const procedures = module.procedures || [];
  if (!deepDives.length && !procedures.length) return "";

  return `
    <section class="lesson-section expanded-reference">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Expanded study notes</p>
          <h3>Detailed reference and procedures</h3>
        </div>
        <span class="status-pill">${deepDives.length + procedures.length} sections</span>
      </div>
      <div class="reference-stack">
        ${deepDives.map((section) => `
          <details class="reference-item">
            <summary>${escapeHtml(lensText(section.title))}</summary>
            <div class="reference-body">
              ${section.intro ? `<p>${escapeHtml(lensText(section.intro))}</p>` : ""}
              ${section.points?.length ? `<ul class="clean-list">${section.points.map((point) => `<li>${escapeHtml(lensText(point))}</li>`).join("")}</ul>` : ""}
              ${section.example ? `<div class="reference-example"><strong>Worked example</strong><p>${escapeHtml(lensText(section.example))}</p></div>` : ""}
              ${section.examTip ? `<div class="reference-exam"><strong>Exam reflex</strong><p>${escapeHtml(lensText(section.examTip))}</p></div>` : ""}
            </div>
          </details>
        `).join("")}
        ${procedures.map((procedure) => `
          <details class="reference-item procedure-item">
            <summary>${escapeHtml(lensText(procedure.title))}</summary>
            <div class="reference-body">
              <ol class="procedure-list">
                ${procedure.steps.map((step) => `<li>${escapeHtml(lensText(step))}</li>`).join("")}
              </ol>
            </div>
          </details>
        `).join("")}
      </div>
    </section>
  `;
}

function moduleRailItem(module, active) {
  const progress = moduleMastery(module);
  const domain = domainById(module.domain);
  return `
    <button class="module-row ${active ? "active" : ""}" type="button" data-module-id="${escapeAttr(module.id)}">
      <span>${escapeHtml(module.number)}</span>
      <strong>${escapeHtml(lensText(module.shortTitle))}</strong>
      <small>${domain ? escapeHtml(domain.label) : "Orientation"} / ${progress}%</small>
    </button>
  `;
}

function filteredCourseModules() {
  const search = (state.ui.courseSearch || "").trim().toLowerCase();
  const domain = state.ui.courseDomain || "all";
  return data.modules.filter((module) => {
    const domainMatch = domain === "all" || module.domain === domain;
    const haystack = [
      module.title,
      module.shortTitle,
      module.summary,
      module.coreIdea,
      ...module.topics,
      ...module.outcomes,
      ...(module.deepDives || []).flatMap((section) => [
        section.title,
        section.intro || "",
        ...(section.points || []),
        section.example || "",
        section.examTip || ""
      ]),
      ...(module.procedures || []).flatMap((procedure) => [procedure.title, ...procedure.steps]),
      activeLens().moduleLens?.[module.id]?.title || "",
      activeLens().moduleLens?.[module.id]?.scenario || ""
    ].join(" ").toLowerCase();
    return domainMatch && (!search || lensText(haystack).toLowerCase().includes(search));
  });
}

function nextRecommendation() {
  const weakModules = data.modules
    .filter((module) => module.domain !== "orientation")
    .map((module) => ({ module, mastery: moduleMastery(module) }))
    .sort((a, b) => a.mastery - b.mastery);

  const lowDomain = data.domains
    .map((domain) => ({ domain, score: domainScore(domain.id) }))
    .sort((a, b) => a.score - b.score)[0];

  const nextLab = data.labs.find((lab) => labProgress(lab).percent < 100);

  if (nextLab && completedModuleCount() >= 2 && labProgress(nextLab).percent < 50) {
    const linkedModule = data.modules.find((module) => module.labIds.includes(nextLab.id)) || weakModules[0].module;
    const themedNextLab = themedLab(nextLab);
    return {
      kind: "Lab gap",
      title: `Finish Lab ${nextLab.number}: ${themedNextLab.title}`,
      reason: "Your hands-on build is behind your concept coverage. AB-410 scenarios reward recognition built through doing.",
      action: "Open Linked Lesson",
      moduleId: linkedModule.id
    };
  }

  const target = weakModules[0];
  return {
    kind: lowDomain ? lowDomain.domain.label : "Course",
    title: target ? lensText(target.module.title) : lensText(data.modules[0].title),
    reason: target
      ? `${lensText(target.module.shortTitle)} is the lowest mastery area now. It sits inside ${domainById(target.module.domain).title}, which carries ${domainById(target.module.domain).weight} of the exam.`
      : "All lessons have good coverage. Move into mixed practice and repair weak concepts.",
    action: target ? "Continue Lesson" : "Practice Scenarios",
    moduleId: target ? target.module.id : data.modules[0].id
  };
}

function readinessScore() {
  const weighted = data.domains.reduce((sum, domain) => sum + (domainScore(domain.id) * domain.weightValue), 0);
  return Math.round(weighted / data.domains.reduce((sum, domain) => sum + domain.weightValue, 0));
}

function domainScore(domainId) {
  const modules = data.modules.filter((module) => module.domain === domainId);
  if (!modules.length) return 0;
  const score = modules.reduce((sum, module) => sum + moduleMastery(module), 0) / modules.length;
  return Math.round(score);
}

function moduleMastery(module) {
  const quiz = state.quizzes[module.id]?.best || 0;
  const studied = isModuleComplete(module.id) ? 100 : 0;
  const lab = module.labIds.length ? moduleLabProgress(module) : studied;
  if (module.domain === "orientation") {
    return Math.round((studied * 0.4) + (quiz * 0.6));
  }
  return Math.round((studied * 0.25) + (quiz * 0.5) + (lab * 0.25));
}

function moduleLabProgress(module) {
  if (!module.labIds.length) return isModuleComplete(module.id) ? 100 : 0;
  const total = module.labIds
    .map(labById)
    .filter(Boolean)
    .reduce((sum, lab) => sum + labProgress(lab).percent, 0);
  return Math.round(total / module.labIds.length);
}

function labProgress(lab) {
  const themed = themedLab(lab);
  const checks = lensLabState()[lab.id] || {};
  const done = themed.checkpoints.filter((_, index) => Boolean(checks[index])).length;
  return {
    done,
    total: themed.checkpoints.length,
    percent: Math.round((done / themed.checkpoints.length) * 100)
  };
}

function domainLabProgress(domainId) {
  const labs = data.labs.filter((lab) => lab.domain === domainId);
  if (!labs.length) return 0;
  return Math.round(labs.reduce((sum, lab) => sum + labProgress(lab).percent, 0) / labs.length);
}

function completedModuleCount() {
  return data.modules.filter((module) => isModuleComplete(module.id)).length;
}

function completedLabCount() {
  return data.labs.filter((lab) => labProgress(lab).percent === 100).length;
}

function averageQuizScore() {
  const scores = data.modules
    .map((module) => state.quizzes[module.id]?.best)
    .filter((score) => typeof score === "number");
  if (!scores.length) return 0;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

function isModuleComplete(moduleId) {
  return Boolean(state.modules[moduleId]?.complete);
}

function readinessMessage(score) {
  if (score >= 85) return "Exam mode: focus on mixed scenarios, timing, and repairing recurring misses.";
  if (score >= 65) return "Good build: finish labs and push every domain above 80%.";
  if (score >= 35) return "The architecture is forming. Keep pairing lessons with the linked labs.";
  return "Start with the foundation and build the masterwork in order.";
}

function makePracticeSet(domainId) {
  const all = allPracticeQuestions().filter((question) => domainId === "all" || question.domain === domainId);
  const sorted = [...all].sort((a, b) => {
    const aw = state.wrongConcepts[a.concept] || 0;
    const bw = state.wrongConcepts[b.concept] || 0;
    if (bw !== aw) return bw - aw;
    return a.id.localeCompare(b.id);
  });
  const firstPass = sorted.slice(0, 10);
  if (firstPass.length >= 6) return firstPass.map((question) => question.id);
  return all.slice(0, 10).map((question) => question.id);
}

function allPracticeQuestions() {
  return data.modules.flatMap((module) => module.masteryChecks.map((question, index) => ({
    ...question,
    id: `${module.id}:${index}`,
    moduleId: module.id,
    moduleTitle: module.shortTitle,
    domain: module.domain
  })));
}

function practiceQuestionsByIds(ids) {
  const all = allPracticeQuestions();
  const map = Object.fromEntries(all.map((question) => [question.id, question]));
  return ids.map((id) => map[id]).filter(Boolean);
}

function topWrongConcepts() {
  return Object.entries(state.wrongConcepts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
}

function moduleById(id) {
  return data.modules.find((module) => module.id === id);
}

function labById(id) {
  return data.labs.find((lab) => lab.id === id);
}

function domainById(id) {
  return data.domains.find((domain) => domain.id === id);
}

function activeLensId() {
  return state.ui?.lens && data.lenses[state.ui.lens] ? state.ui.lens : "healthcare";
}

function activeLens() {
  return data.lenses[activeLensId()] || data.lenses.healthcare;
}

function lensLabState() {
  state.labs ||= {};
  const id = activeLensId();
  state.labs[id] ||= {};
  return state.labs[id];
}

function themedLab(lab) {
  const override = activeLens().labOverrides?.[lab.id] || {};
  const merged = { ...lab, ...override };
  return {
    ...merged,
    title: lensText(merged.title),
    objective: lensText(merged.objective),
    build: lensText(merged.build),
    checkpoints: (merged.checkpoints || []).map(lensText),
    deliverable: lensText(merged.deliverable || ""),
    examAnchor: lensText(merged.examAnchor || "")
  };
}

function themedQuestion(item) {
  return {
    ...item,
    question: lensText(item.question),
    options: item.options.map(lensText),
    explanation: lensText(item.explanation)
  };
}

function lensText(value) {
  let text = String(value);
  const replacements = activeLens().replacements || [];
  replacements.forEach(([from, to]) => {
    text = text.split(from).join(to);
  });
  return text;
}

function meter(value) {
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  return `
    <div class="meter" aria-hidden="true">
      <span style="width: ${safe}%"></span>
    </div>
  `;
}

function list(items) {
  return `<ul class="clean-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function cssEscape(value) {
  if (window.CSS && CSS.escape) return CSS.escape(value);
  return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

function getStateSnapshot() {
  return JSON.parse(JSON.stringify(state));
}

function getMetrics() {
  return {
    readiness: readinessScore(),
    completedModules: completedModuleCount(),
    totalModules: data.modules.length,
    completedLabs: completedLabCount(),
    totalLabs: data.labs.length,
    averageQuiz: averageQuizScore(),
    practiceBest: state.practice.best || 0,
    lens: activeLensId()
  };
}

function setUserScope(uid) {
  activeStorageKey = uid ? storageKey + ":" + uid : storageKey;
  state = loadState(activeStorageKey);
  currentView = state.ui.view || "dashboard";
  activeModuleId = state.ui.activeModuleId || data.modules[0].id;
  render();
}

function applyRemoteState(remoteState) {
  state = normalizeState(remoteState || {});
  currentView = state.ui.view || "dashboard";
  activeModuleId = state.ui.activeModuleId || data.modules[0].id;
  localStorage.setItem(activeStorageKey, JSON.stringify(state));
  render();
}

window.AB410_APP = Object.freeze({
  storageKey,
  getState: getStateSnapshot,
  getMetrics,
  setUserScope,
  applyRemoteState,
  save: () => saveState(),
  render
});
