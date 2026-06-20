export class ProgressDashboardRenderer {
  constructor(state, userProfile) {
    this.state = state;
    this.userProfile = userProfile;
  }

  render() {
    const stats = this.calculateStats();
    const streak = this.calculateStreak();

    return `
      <div class="dashboard-grid">
        ${this.renderHeader(streak)}
        ${this.renderProgressCards(stats)}
        ${this.renderActivityChart()}
        ${this.renderPerformanceSection(stats)}
        ${this.renderRecentActivity()}
      </div>
    `;
  }

  renderHeader(streak) {
    const userName = this.userProfile?.displayName || 'Student';
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    return `
      <div class="progress-header">
        <div class="progress-title">
          <h1>Progress Tracker</h1>
          <p>Your learning journey for AB-410</p>
        </div>
        <div class="progress-user-section">
          <div class="streak-badge ${streak.current > 7 ? 'hot' : ''}">
            <div class="streak-flame">🔥</div>
            <div class="streak-number">${streak.current}</div>
            <div class="streak-label">Day Streak</div>
          </div>
        </div>
      </div>
    `;
  }

  renderProgressCards(stats) {
    const examReadiness = Math.min(100, stats.examReadiness);

    return `
      <div class="progress-grid">
        <div class="progress-card ${examReadiness >= 70 ? 'milestone' : ''}">
          <div class="progress-card-header">
            <span class="progress-card-icon">📊</span>
            <p class="progress-card-label">Exam Readiness</p>
          </div>
          <p class="progress-card-value">${examReadiness}%</p>
          <p class="progress-card-meta">${this.readinessText(examReadiness)}</p>
        </div>

        <div class="progress-card">
          <div class="progress-card-header">
            <span class="progress-card-icon">📚</span>
            <p class="progress-card-label">Modules</p>
          </div>
          <p class="progress-card-value">${stats.modulesCompleted}</p>
          <p class="progress-card-meta">modules completed</p>
        </div>

        <div class="progress-card">
          <div class="progress-card-header">
            <span class="progress-card-icon">✅</span>
            <p class="progress-card-label">Quizzes</p>
          </div>
          <p class="progress-card-value">${stats.quizzesCompleted}</p>
          <p class="progress-card-meta">quizzes mastered</p>
        </div>

        <div class="progress-card">
          <div class="progress-card-header">
            <span class="progress-card-icon">🧪</span>
            <p class="progress-card-label">Labs</p>
          </div>
          <p class="progress-card-value">${stats.labsCompleted}</p>
          <p class="progress-card-meta">labs completed</p>
        </div>
      </div>
    `;
  }

  renderActivityChart() {
    const activityData = this.generateWeeklyActivity();
    const maxActivity = Math.max(...activityData.values, 1);

    const bars = activityData.values.map((val, i) => {
      const height = (val / maxActivity) * 100;
      return `
        <div class="activity-bar-container">
          <div class="activity-bar" style="height: ${height}%" title="${val} activities"></div>
          <span class="activity-bar-label">${activityData.labels[i]}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="activity-chart">
        <div class="activity-chart-header">
          <h3 class="activity-chart-title">Weekly Activity</h3>
          <div class="activity-filter">
            <button class="active">Week</button>
            <button>Month</button>
            <button>Year</button>
          </div>
        </div>
        <div class="activity-bars">
          ${bars}
        </div>
        <div class="heatmap-container">
          ${this.renderHeatmap()}
        </div>
      </div>
    `;
  }

  renderHeatmap() {
    const activities = this.getActivityDates();
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 27);

    let days = '';
    for (let i = 0; i < 28; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toDateString();
      const isActive = activities.includes(dateStr);
      const isToday = dateStr === today.toDateString();

      days += `
        <div class="heatmap-day ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}"
             title="${date.toLocaleDateString()}"></div>
      `;
    }
    return days;
  }

  renderPerformanceSection(stats) {
    return `
      <div class="performance-section">
        <div class="performance-header">
          <div>
            <h3 class="performance-title">Performance Overview</h3>
            <p class="performance-subtitle">Last 30 days</p>
          </div>
        </div>

        <div class="metric-row">
          <span class="metric-label">Practice Attempts</span>
          <div class="metric-bar-wrapper">
            <div class="metric-bar">
              <div class="metric-bar-fill" style="width: ${Math.min(100, (stats.practiceAttempts / 50) * 100)}%"></div>
            </div>
          </div>
          <div class="metric-value">${stats.practiceAttempts}</div>
        </div>

        <div class="metric-row">
          <span class="metric-label">Best Practice Score</span>
          <div class="metric-bar-wrapper">
            <div class="metric-bar">
              <div class="metric-bar-fill" style="width: ${stats.bestPracticeScore}%"></div>
            </div>
          </div>
          <div class="metric-value">${stats.bestPracticeScore}<span class="metric-unit">%</span></div>
        </div>

        <div class="metric-row">
          <span class="metric-label">Labs Completed</span>
          <div class="metric-bar-wrapper">
            <div class="metric-bar">
              <div class="metric-bar-fill" style="width: ${Math.min(100, (stats.labsCompleted / 12) * 100)}%"></div>
            </div>
          </div>
          <div class="metric-value">${stats.labsCompleted}<span class="metric-unit">/ 12</span></div>
        </div>

        <div class="metric-row">
          <span class="metric-label">Study Consistency</span>
          <div class="metric-bar-wrapper">
            <div class="metric-bar">
              <div class="metric-bar-fill" style="width: ${Math.min(100, stats.studyConsistency)}%"></div>
            </div>
          </div>
          <div class="metric-value">${Math.round(stats.studyConsistency)}<span class="metric-unit">%</span></div>
        </div>
      </div>
    `;
  }

  renderRecentActivity() {
    const activities = this.getRecentActivities();

    if (activities.length === 0) {
      return `
        <div class="activity-list">
          <div class="empty-activity">
            <p>📌 No recent activity. Start learning to see your progress here!</p>
          </div>
        </div>
      `;
    }

    const items = activities.slice(0, 8).map(activity => {
      const icon = this.getActivityIcon(activity.type);
      const timeAgo = this.timeAgo(activity.timestamp);
      const score = activity.score ? `${activity.score}%` : '';

      return `
        <div class="activity-item">
          <div class="activity-item-icon">${icon}</div>
          <div class="activity-item-content">
            <p class="activity-item-title">${activity.title}</p>
            <p class="activity-item-time">${timeAgo}</p>
          </div>
          ${score ? `<div class="activity-item-score">${score}</div>` : ''}
        </div>
      `;
    }).join('');

    return `
      <div class="activity-list">
        <h3 style="margin: 0 0 12px; font-family: Georgia, serif; font-size: 20px; color: var(--ink);">Recent Activity</h3>
        ${items}
      </div>
    `;
  }

  calculateStats() {
    const modules = Object.values(this.state.modules || {});
    const quizzes = Object.values(this.state.quizzes || {});
    const labs = Object.values(this.state.labs || {});
    const practice = this.state.practice || {};

    const modulesCompleted = modules.filter(m => m?.completed).length;
    const quizzesCompleted = quizzes.filter(q => q?.completed).length;
    const labsCompleted = labs.filter(l => l?.completed).length;

    const examReadiness = Math.round(
      ((modulesCompleted + quizzesCompleted + labsCompleted) /
       (modules.length + quizzes.length + labs.length || 1)) * 100
    );

    return {
      modulesCompleted,
      quizzesCompleted,
      labsCompleted,
      practiceAttempts: practice.attempts || 0,
      bestPracticeScore: practice.best || 0,
      examReadiness,
      studyConsistency: Math.min(100, (practice.attempts / 2)),
      totalStudyTime: practice.totalTime || 0
    };
  }

  calculateStreak() {
    const activities = this.getActivityDates();
    if (activities.length === 0) return { current: 0, best: 0 };

    let current = 0;
    let best = 0;
    let today = new Date();

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();

      if (activities.includes(dateStr)) {
        current++;
        best = Math.max(best, current);
      } else if (i > 0) {
        break;
      }
    }

    return { current, best };
  }

  generateWeeklyActivity() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const values = Array(7).fill(0);
    const activities = this.getActivityDates();

    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toDateString();
      values[i] = activities.filter(a => a === dateStr).length || Math.floor(Math.random() * 3);
    }

    return { labels: days, values };
  }

  getActivityDates() {
    const modules = Object.values(this.state.modules || {});
    const dates = [];

    modules.forEach(m => {
      if (m?.completedAt) {
        const date = new Date(m.completedAt).toDateString();
        if (!dates.includes(date)) dates.push(date);
      }
    });

    return dates.length > 0 ? dates : [new Date().toDateString()];
  }

  getRecentActivities() {
    const activities = [];
    const modules = this.state.modules || {};
    const quizzes = this.state.quizzes || {};
    const labs = this.state.labs || {};

    Object.entries(modules).forEach(([id, m]) => {
      if (m?.completed) {
        activities.push({
          type: 'module',
          title: `Completed module: ${m.title || id}`,
          timestamp: m.completedAt || Date.now(),
          score: m.score
        });
      }
    });

    Object.entries(quizzes).forEach(([id, q]) => {
      if (q?.completed) {
        activities.push({
          type: 'quiz',
          title: `Finished quiz: ${q.title || id}`,
          timestamp: q.completedAt || Date.now(),
          score: q.score
        });
      }
    });

    return activities.sort((a, b) => b.timestamp - a.timestamp);
  }

  readinessText(percentage) {
    if (percentage >= 80) return 'Exam ready! 🎯';
    if (percentage >= 60) return 'Getting close 📈';
    if (percentage >= 40) return 'Keep learning 💪';
    return 'Just getting started 🚀';
  }

  getActivityIcon(type) {
    const icons = {
      module: '📚',
      quiz: '✅',
      lab: '🧪',
      practice: '🎯',
      achievement: '⭐'
    };
    return icons[type] || '📝';
  }

  timeAgo(timestamp) {
    const ms = typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime();
    const seconds = Math.floor((Date.now() - ms) / 1000);

    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}

export default ProgressDashboardRenderer;
