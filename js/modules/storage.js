/**
 * Storage Module
 * Manages persistent user state in localStorage (theme, progress, bookmarks, quiz scores).
 */

const STORAGE_KEYS = {
  THEME: "tensecraft_theme",
  COMPLETED_LESSONS: "tensecraft_completed_lessons",
  BOOKMARKS: "tensecraft_bookmarks",
  QUIZ_STATS: "tensecraft_quiz_stats",
  LAST_ACTIVE: "tensecraft_last_active_date",
  STREAK: "tensecraft_streak"
};

export class StorageManager {
  static getTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved) return saved;
    // Check OS preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  static setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  static getCompletedLessons() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static toggleCompletedLesson(tenseId) {
    const list = this.getCompletedLessons();
    const index = list.indexOf(tenseId);
    let isCompleted;
    if (index > -1) {
      list.splice(index, 1);
      isCompleted = false;
    } else {
      list.push(tenseId);
      isCompleted = true;
    }
    localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(list));
    this.updateStreak();
    return isCompleted;
  }

  static isLessonCompleted(tenseId) {
    return this.getCompletedLessons().includes(tenseId);
  }

  static getBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static toggleBookmark(tenseId) {
    const list = this.getBookmarks();
    const index = list.indexOf(tenseId);
    let isBookmarked;
    if (index > -1) {
      list.splice(index, 1);
      isBookmarked = false;
    } else {
      list.push(tenseId);
      isBookmarked = true;
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    return isBookmarked;
  }

  static isBookmarked(tenseId) {
    return this.getBookmarks().includes(tenseId);
  }

  static getQuizStats() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_STATS);
      return raw ? JSON.parse(raw) : { totalQuestions: 0, correctAnswers: 0, highStreak: 0, currentStreak: 0 };
    } catch {
      return { totalQuestions: 0, correctAnswers: 0, highStreak: 0, currentStreak: 0 };
    }
  }

  static saveQuizResult(isCorrect) {
    const stats = this.getQuizStats();
    stats.totalQuestions += 1;
    if (isCorrect) {
      stats.correctAnswers += 1;
      stats.currentStreak += 1;
      if (stats.currentStreak > stats.highStreak) {
        stats.highStreak = stats.currentStreak;
      }
    } else {
      stats.currentStreak = 0;
    }
    localStorage.setItem(STORAGE_KEYS.QUIZ_STATS, JSON.stringify(stats));
    this.updateStreak();
    return stats;
  }

  static updateStreak() {
    const today = new Date().toISOString().split("T")[0];
    const lastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE);
    let streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || "0", 10);

    if (!lastActive) {
      streak = 1;
    } else if (lastActive !== today) {
      const lastDate = new Date(lastActive);
      const currDate = new Date(today);
      const diffDays = Math.floor((currDate - lastDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, today);
    localStorage.setItem(STORAGE_KEYS.STREAK, streak.toString());
    return streak;
  }

  static getStreak() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || "1", 10);
  }
}
