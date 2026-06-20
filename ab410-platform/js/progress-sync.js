import { db, doc, getDoc, setDoc, updateDoc, serverTimestamp } from './firebase-setup.js';

export class ProgressSync {
  constructor(userId) {
    this.userId = userId;
    this.progressRef = doc(db, 'users', userId, 'progress', 'current');
  }

  async loadProgress() {
    try {
      const snap = await getDoc(this.progressRef);
      return snap.exists() ? snap.data() : null;
    } catch (error) {
      console.error('Error loading progress:', error);
      return null;
    }
  }

  async saveProgress(state) {
    try {
      const timestamp = serverTimestamp();
      await setDoc(this.progressRef, {
        ...state,
        lastUpdated: timestamp,
        syncedAt: timestamp
      }, { merge: true });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  async updateProgress(updates) {
    try {
      await updateDoc(this.progressRef, {
        ...updates,
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }

  async logActivity(activity) {
    try {
      const activitiesRef = doc(db, 'users', this.userId, 'activities', `${Date.now()}`);
      await setDoc(activitiesRef, {
        ...activity,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }

  async getStats() {
    try {
      const statsRef = doc(db, 'users', this.userId, 'stats', 'aggregate');
      const snap = await getDoc(statsRef);
      return snap.exists() ? snap.data() : this.defaultStats();
    } catch (error) {
      console.error('Error getting stats:', error);
      return this.defaultStats();
    }
  }

  async updateStats(stats) {
    try {
      const statsRef = doc(db, 'users', this.userId, 'stats', 'aggregate');
      await setDoc(statsRef, {
        ...stats,
        lastUpdated: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  }

  calculateStreak(activities) {
    if (!activities || activities.length === 0) return { current: 0, best: 0 };

    const dates = activities
      .map(a => new Date(a.timestamp.toDate()).toDateString())
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort()
      .reverse();

    let current = 0;
    let best = 0;
    let expectedDate = new Date();

    for (const dateStr of dates) {
      const actDate = new Date(dateStr);
      const diff = Math.floor((expectedDate - actDate) / (1000 * 60 * 60 * 24));

      if (diff === 0 || diff === 1) {
        current++;
        best = Math.max(best, current);
      } else {
        break;
      }

      expectedDate = actDate;
    }

    return { current, best };
  }

  defaultStats() {
    return {
      modulesCompleted: 0,
      quizzesCompleted: 0,
      labsCompleted: 0,
      practiceAttempts: 0,
      bestPracticeScore: 0,
      currentStreak: 0,
      bestStreak: 0,
      totalStudyTime: 0,
      examReadiness: 0
    };
  }
}

export default ProgressSync;
