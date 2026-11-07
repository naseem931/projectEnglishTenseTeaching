/**
 * Main Application Orchestrator
 * Coordinates Navigation, Views, Theme Toggling, Search, Offline PWA, and Modules.
 */

import { tensesData, categories } from "./data/tensesData.js";
import { irregularVerbs } from "./data/irregularVerbs.js";
import { StorageManager } from "./modules/storage.js";
import { speechEngine } from "./modules/speech.js";
import { TimelineVisualizer } from "./modules/timeline.js";
import { QuizEngine } from "./modules/quiz.js";
import { FlashcardEngine } from "./modules/flashcards.js";
import { StorytellingEngine } from "./modules/storytelling.js";

class App {
  constructor() {
    this.currentCategory = "all";
    this.searchQuery = "";
    this.selectedTense = null;
    this.timelineVisualizer = null;
    this.quizEngine = null;
    this.flashcardEngine = null;

    this.init();
  }

  init() {
    this.initTheme();
    this.initNavigation();
    this.initGitHubModal();
    this.initSubEngines();
    this.initPWA();
    this.renderStreak();
    this.handleRouting();

    window.addEventListener("hashchange", () => this.handleRouting());
  }

  /* ------------------- GitHub Modal & Deployment ------------------- */
  initGitHubModal() {
    const modalBtn = document.getElementById("github-modal-btn");
    const modal = document.getElementById("github-modal");
    const closeBtn = document.getElementById("close-modal-btn");
    const doneBtn = document.getElementById("modal-done-btn");
    const input = document.getElementById("gh-user-repo-input");
    const saveBtn = document.getElementById("save-gh-link-btn");
    const statusHint = document.getElementById("gh-saved-status");

    if (!modal) return;

    const savedLink = localStorage.getItem("tensecraft_custom_gh_link");
    if (savedLink && input) {
      input.value = savedLink;
    }

    const openModal = () => modal.classList.remove("hidden");
    const closeModal = () => modal.classList.add("hidden");

    if (modalBtn) modalBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (doneBtn) doneBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    if (saveBtn && input) {
      saveBtn.addEventListener("click", () => {
        let val = input.value.trim();
        if (!val) return;

        // Auto format to full URL if user just enters "username/repo"
        if (!val.startsWith("http://") && !val.startsWith("https://")) {
          if (val.includes(".github.io")) {
            val = `https://${val}`;
          } else if (val.includes("/")) {
            const [username, repo] = val.split("/");
            val = `https://${username}.github.io/${repo}/`;
          } else {
            val = `https://github.com/${val}`;
          }
        }

        localStorage.setItem("tensecraft_custom_gh_link", val);
        if (statusHint) {
          statusHint.classList.remove("hidden");
          setTimeout(() => statusHint.classList.add("hidden"), 3000);
        }
        window.open(val, "_blank");
      });
    }
  }

  /* ------------------- Theme Management ------------------- */
  initTheme() {
    const savedTheme = StorageManager.getTheme();
    this.applyTheme(savedTheme);

    const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
    themeToggleBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const newTheme = current === "dark" ? "light" : "dark";
        this.applyTheme(newTheme);
      });
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    StorageManager.setTheme(theme);
    const icons = document.querySelectorAll(".theme-icon");
    icons.forEach(icon => {
      icon.textContent = theme === "dark" ? "☀️" : "🌙";
    });
  }

  /* ------------------- PWA & Offline Support ------------------- */
  initPWA() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
          .then(reg => console.log("Service Worker registered successfully:", reg.scope))
          .catch(err => console.log("Service Worker registration failed:", err));
      });
    }

    // Monitor online/offline status
    const updateOnlineStatus = () => {
      const banner = document.getElementById("offline-status-indicator");
      if (!banner) return;
      if (!navigator.onLine) {
        banner.classList.remove("hidden");
      } else {
        banner.classList.add("hidden");
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();
  }

  renderStreak() {
    const streak = StorageManager.updateStreak();
    const badge = document.getElementById("header-streak-badge");
    if (badge) {
      badge.innerHTML = `🔥 <span>${streak} Day Streak</span>`;
    }
  }

  /* ------------------- Navigation & Routing ------------------- */
  initNavigation() {
    // Mobile Drawer toggle
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const navDrawer = document.getElementById("nav-sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (menuToggle && navDrawer && overlay) {
      const toggleDrawer = () => {
        navDrawer.classList.toggle("open");
        overlay.classList.toggle("open");
      };
      menuToggle.addEventListener("click", toggleDrawer);
      overlay.addEventListener("click", toggleDrawer);

      // Close drawer when link clicked on mobile
      navDrawer.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
          if (window.innerWidth <= 1024) {
            navDrawer.classList.remove("open");
            overlay.classList.remove("open");
          }
        });
      });
    }
  }

  initSubEngines() {
    this.timelineVisualizer = new TimelineVisualizer("timeline-mount", (tenseId) => {
      window.location.hash = `#learn?tense=${tenseId}`;
    });

    this.quizEngine = new QuizEngine("quiz-mount");
    this.flashcardEngine = new FlashcardEngine("flashcard-mount");
    this.storyEngine = new StorytellingEngine("story-mount");
  }

  handleRouting() {
    const rawHash = window.location.hash.slice(1) || "learn";
    const [view, queryStr] = rawHash.split("?");
    const params = new URLSearchParams(queryStr);

    // Update active nav links
    document.querySelectorAll(".nav-link").forEach(link => {
      const href = link.getAttribute("href")?.replace("#", "");
      if (href === view) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Hide all view sections
    document.querySelectorAll(".view-section").forEach(sec => sec.classList.add("hidden"));

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    switch (view) {
      case "learn":
        document.getElementById("learn-section")?.classList.remove("hidden");
        const tenseParam = params.get("tense");
        this.renderLearnView(tenseParam);
        break;

      case "timeline":
        document.getElementById("timeline-section")?.classList.remove("hidden");
        const activeTense = params.get("tense") || "present-simple";
        this.timelineVisualizer.render(activeTense);
        break;

      case "quiz":
        document.getElementById("quiz-section")?.classList.remove("hidden");
        const quizTense = params.get("tense") || "all";
        this.quizEngine.init(quizTense);
        break;

      case "flashcards":
        document.getElementById("flashcards-section")?.classList.remove("hidden");
        this.flashcardEngine.init();
        break;

      case "story":
        document.getElementById("story-section")?.classList.remove("hidden");
        this.storyEngine.init();
        break;

      case "matrix":
        document.getElementById("matrix-section")?.classList.remove("hidden");
        this.renderMatrixView();
        break;

      case "verbs":
        document.getElementById("verbs-section")?.classList.remove("hidden");
        this.renderVerbsView();
        break;

      default:
        document.getElementById("learn-section")?.classList.remove("hidden");
        this.renderLearnView();
        break;
    }
  }

  /* ------------------- Learn / Library View ------------------- */
  renderLearnView(activeTenseId = null) {
    const container = document.getElementById("learn-section");
    if (!container) return;

    if (activeTenseId) {
      const found = tensesData.find(t => t.id === activeTenseId);
      if (found) {
        this.renderTenseDetail(found);
        return;
      }
    }

    // Render list/grid view
    container.innerHTML = `
      <div class="learn-header-banner">
        <div class="learn-banner-content">
          <h1>Master All 12 English Tenses</h1>
          <p>Interactive lessons, clear formulas, signal words, audio pronunciation, and real-world examples.</p>
        </div>

        <div class="search-and-filters">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="tense-search-input" placeholder="Search tenses, formulas, signal words (e.g., 'yesterday', 'have been')..." value="${this.searchQuery}" />
            ${this.searchQuery ? `<button id="clear-search-btn" class="clear-btn">&times;</button>` : ''}
          </div>

          <div class="category-filters-container">
            ${categories.map(cat => `
              <button class="cat-pill ${this.currentCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.name}
              </button>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- Tenses Grid -->
      <div class="tenses-grid" id="tenses-grid-container">
        ${this.buildTenseCardsHtml()}
      </div>
    `;

    this.bindLearnEvents();
  }

  buildTenseCardsHtml() {
    let filtered = tensesData;

    // Filter by category
    if (this.currentCategory !== "all") {
      filtered = filtered.filter(t => t.category === this.currentCategory);
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(t => {
        return t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.signalWords.some(w => w.toLowerCase().includes(q)) ||
          t.formulas.affirmative.toLowerCase().includes(q) ||
          t.usages.some(u => u.example.toLowerCase().includes(q) || u.title.toLowerCase().includes(q));
      });
    }

    if (filtered.length === 0) {
      return `
        <div class="empty-state full-width">
          <div class="empty-icon">🔍</div>
          <h3>No tenses match "${this.searchQuery}"</h3>
          <p>Try searching for words like "always", "will", "had", or "continuous".</p>
          <button class="btn btn-outline" id="reset-search-btn">Clear Search</button>
        </div>
      `;
    }

    return filtered.map(tense => {
      const isCompleted = StorageManager.isLessonCompleted(tense.id);
      const isBookmarked = StorageManager.isBookmarked(tense.id);

      return `
        <div class="tense-card animate-fadeIn" style="--card-accent: ${tense.color}">
          <div class="tense-card-header">
            <span class="badge" style="background: ${tense.color}20; color: ${tense.color}; border: 1px solid ${tense.color}40;">
              ${tense.category.toUpperCase()} • ${tense.aspect.toUpperCase()}
            </span>
            <div class="card-status-actions">
              <button class="action-icon-btn bookmark-btn ${isBookmarked ? 'active' : ''}" data-tense="${tense.id}" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark this tense'}">
                ${isBookmarked ? '★' : '☆'}
              </button>
              <button class="action-icon-btn complete-btn ${isCompleted ? 'active' : ''}" data-tense="${tense.id}" title="${isCompleted ? 'Marked as completed' : 'Mark as complete'}">
                ${isCompleted ? '✓ Done' : '○'}
              </button>
            </div>
          </div>

          <div class="tense-card-body">
            <h2 class="tense-card-title">${tense.name}</h2>
            <p class="tense-card-tagline">${tense.tagline}</p>

            <div class="formula-preview">
              <span class="preview-label">Positive Formula:</span>
              <code>${tense.formulas.affirmative}</code>
            </div>

            <div class="signals-preview">
              <div class="signals-row">
                ${tense.signalWords.slice(0, 4).map(w => `<span class="signal-tag">${w}</span>`).join("")}
                ${tense.signalWords.length > 4 ? `<span class="signal-tag more">+${tense.signalWords.length - 4}</span>` : ''}
              </div>
            </div>
          </div>

          <div class="tense-card-footer">
            <a href="#learn?tense=${tense.id}" class="btn btn-primary btn-sm btn-block">
              Study Lesson &rarr;
            </a>
          </div>
        </div>
      `;
    }).join("");
  }

  bindLearnEvents() {
    const searchInput = document.getElementById("tense-search-input");
    const clearBtn = document.getElementById("clear-search-btn");
    const resetBtn = document.getElementById("reset-search-btn");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        const grid = document.getElementById("tenses-grid-container");
        if (grid) grid.innerHTML = this.buildTenseCardsHtml();
        this.bindCardActionEvents();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        this.searchQuery = "";
        this.renderLearnView();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.searchQuery = "";
        this.currentCategory = "all";
        this.renderLearnView();
      });
    }

    // Category pill clicks
    const catPills = document.querySelectorAll(".cat-pill");
    catPills.forEach(pill => {
      pill.addEventListener("click", () => {
        this.currentCategory = pill.dataset.cat;
        catPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        const grid = document.getElementById("tenses-grid-container");
        if (grid) grid.innerHTML = this.buildTenseCardsHtml();
        this.bindCardActionEvents();
      });
    });

    this.bindCardActionEvents();
  }

  bindCardActionEvents() {
    // Bookmarks
    document.querySelectorAll(".bookmark-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const tenseId = btn.dataset.tense;
        const nowActive = StorageManager.toggleBookmark(tenseId);
        btn.classList.toggle("active", nowActive);
        btn.innerHTML = nowActive ? "★" : "☆";
      });
    });

    // Completed buttons
    document.querySelectorAll(".complete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const tenseId = btn.dataset.tense;
        const isDone = StorageManager.toggleCompletedLesson(tenseId);
        btn.classList.toggle("active", isDone);
        btn.innerHTML = isDone ? "✓ Done" : "○";
        this.renderStreak();
      });
    });
  }

  /* ------------------- Tense Detail View ------------------- */
  renderTenseDetail(tense) {
    const container = document.getElementById("learn-section");
    if (!container) return;

    const isCompleted = StorageManager.isLessonCompleted(tense.id);
    const isBookmarked = StorageManager.isBookmarked(tense.id);

    container.innerHTML = `
      <div class="lesson-detail-container animate-fadeIn" style="--tense-theme: ${tense.color}">
        <!-- Top Back Navigation -->
        <div class="lesson-top-nav">
          <a href="#learn" class="back-link">&larr; Back to all tenses</a>
          <div class="lesson-header-actions">
            <button class="btn btn-outline btn-sm bookmark-detail-btn ${isBookmarked ? 'active' : ''}" data-tense="${tense.id}">
              ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
            <button class="btn btn-primary btn-sm complete-detail-btn ${isCompleted ? 'active' : ''}" data-tense="${tense.id}">
              ${isCompleted ? '✓ Completed' : 'Mark as Completed'}
            </button>
          </div>
        </div>

        <!-- Hero Header -->
        <div class="lesson-hero">
          <div class="lesson-hero-badges">
            <span class="badge" style="background: ${tense.color}20; color: ${tense.color}; border: 1px solid ${tense.color}40;">
              ${tense.category.toUpperCase()}
            </span>
            <span class="badge">${tense.badge}</span>
          </div>
          <h1 class="lesson-title">${tense.name}</h1>
          <p class="lesson-tagline">${tense.tagline}</p>
        </div>

        <!-- Formulas Card -->
        <div class="lesson-card formula-card">
          <div class="card-heading">
            <span class="icon">📐</span>
            <h3>Grammar Structure & Formulas</h3>
          </div>
          <div class="formula-boxes-grid">
            <div class="formula-box positive-box">
              <div class="formula-badge">Affirmative (+)</div>
              <div class="formula-code"><code>${tense.formulas.affirmative}</code></div>
              <div class="formula-example-line">
                <span>Example:</span> "${tense.formulaExamples.affirmative}"
                <button class="btn-icon speak-btn" data-text="${tense.formulaExamples.affirmative}" title="Listen">🔊</button>
              </div>
            </div>

            <div class="formula-box negative-box">
              <div class="formula-badge">Negative (-)</div>
              <div class="formula-code"><code>${tense.formulas.negative}</code></div>
              <div class="formula-example-line">
                <span>Example:</span> "${tense.formulaExamples.negative}"
                <button class="btn-icon speak-btn" data-text="${tense.formulaExamples.negative}" title="Listen">🔊</button>
              </div>
            </div>

            <div class="formula-box question-box">
              <div class="formula-badge">Interrogative (?)</div>
              <div class="formula-code"><code>${tense.formulas.interrogative}</code></div>
              <div class="formula-example-line">
                <span>Example:</span> "${tense.formulaExamples.interrogative}"
                <button class="btn-icon speak-btn" data-text="${tense.formulaExamples.interrogative}" title="Listen">🔊</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Rules & Spacing Section -->
        <div class="lesson-card">
          <div class="card-heading">
            <span class="icon">📋</span>
            <h3>Key Spelling & Structural Rules</h3>
          </div>
          <ul class="lesson-rules-list">
            ${tense.rules.map(r => `<li><span class="rule-bullet">✔</span><span>${r}</span></li>`).join("")}
          </ul>
        </div>

        <!-- Usages with Audio Examples -->
        <div class="lesson-card">
          <div class="card-heading">
            <span class="icon">💡</span>
            <h3>When and How to Use It (Real-Life Scenarios)</h3>
          </div>
          <div class="usages-grid">
            ${tense.usages.map((u, idx) => `
              <div class="usage-item-card">
                <div class="usage-num">${idx + 1}</div>
                <div class="usage-content">
                  <h4>${u.title}</h4>
                  <p class="usage-desc">${u.explanation}</p>
                  <div class="usage-example-bubble">
                    <span class="example-quote">"${u.example}"</span>
                    <button class="btn-icon speak-btn" data-text="${u.example}" title="Listen to pronunciation">🔊</button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Signal Words Section -->
        <div class="lesson-card">
          <div class="card-heading">
            <span class="icon">🏷️</span>
            <h3>Common Signal Words / Triggers</h3>
          </div>
          <p class="section-subtext">When you encounter these words in sentences or exams, think of <strong>${tense.name}</strong>:</p>
          <div class="signal-words-cloud">
            ${tense.signalWords.map(w => `<span class="signal-tag-lg">${w}</span>`).join("")}
          </div>
        </div>

        <!-- Common Mistakes & How to Fix Them -->
        <div class="lesson-card mistakes-card">
          <div class="card-heading">
            <span class="icon">⚠️</span>
            <h3>Common Mistakes to Avoid</h3>
          </div>
          <div class="mistakes-list">
            ${tense.commonMistakes.map(m => `
              <div class="mistake-comparison">
                <div class="mistake-side wrong-side">
                  <div class="mistake-status">❌ DON'T SAY</div>
                  <div class="mistake-sentence">"${m.wrong}"</div>
                </div>
                <div class="mistake-side right-side">
                  <div class="mistake-status">✅ DO SAY</div>
                  <div class="mistake-sentence">"${m.right}"</div>
                </div>
                <div class="mistake-reason">
                  <strong>Why?</strong> ${m.reason}
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Pro Tip Mnemonic -->
        <div class="pro-tip-banner">
          <div class="tip-symbol">💡</div>
          <div class="tip-text">
            <h4>Memory Tip</h4>
            <p>${tense.quickTip}</p>
          </div>
        </div>

        <!-- Bottom Action Strip -->
        <div class="lesson-bottom-actions">
          <a href="#timeline?tense=${tense.id}" class="btn btn-secondary">
            📍 View on Timeline
          </a>
          <a href="#quiz?tense=${tense.id}" class="btn btn-primary">
            🎯 Practice ${tense.name} Quiz &rarr;
          </a>
        </div>
      </div>
    `;

    // Bind Speak buttons
    container.querySelectorAll(".speak-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.text;
        btn.classList.add("speaking");
        speechEngine.speak(text, () => {
          btn.classList.remove("speaking");
        });
      });
    });

    // Detail Bookmark & Complete buttons
    const bookmarkBtn = container.querySelector(".bookmark-detail-btn");
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener("click", () => {
        const isNow = StorageManager.toggleBookmark(tense.id);
        bookmarkBtn.classList.toggle("active", isNow);
        bookmarkBtn.innerHTML = isNow ? "★ Bookmarked" : "☆ Bookmark";
      });
    }

    const completeBtn = container.querySelector(".complete-detail-btn");
    if (completeBtn) {
      completeBtn.addEventListener("click", () => {
        const isDone = StorageManager.toggleCompletedLesson(tense.id);
        completeBtn.classList.toggle("active", isDone);
        completeBtn.innerHTML = isDone ? "✓ Completed" : "Mark as Completed";
        this.renderStreak();
      });
    }
  }

  /* ------------------- Cheat Sheet / Matrix View ------------------- */
  renderMatrixView() {
    const container = document.getElementById("matrix-section");
    if (!container) return;

    // Group tenses by aspect
    const aspects = [
      { id: "simple", label: "Simple" },
      { id: "continuous", label: "Continuous" },
      { id: "perfect", label: "Perfect" },
      { id: "perfect-continuous", label: "Perfect Continuous" }
    ];

    container.innerHTML = `
      <div class="matrix-wrapper">
        <div class="matrix-header">
          <h1>Complete 12-Tense Comparison Matrix</h1>
          <p>Instant cheat sheet comparing all English tenses across Past, Present, and Future.</p>
        </div>

        <div class="matrix-table-container">
          <table class="matrix-table">
            <thead>
              <tr>
                <th class="matrix-aspect-col">Aspect</th>
                <th class="matrix-time-col past-th">Past</th>
                <th class="matrix-time-col present-th">Present</th>
                <th class="matrix-time-col future-th">Future</th>
              </tr>
            </thead>
            <tbody>
              ${aspects.map(asp => {
                const pastTense = tensesData.find(t => t.aspect === asp.id && t.category === "past");
                const presTense = tensesData.find(t => t.aspect === asp.id && t.category === "present");
                const futTense = tensesData.find(t => t.aspect === asp.id && t.category === "future");

                return `
                  <tr>
                    <td class="matrix-aspect-title">
                      <strong>${asp.label}</strong>
                    </td>

                    <!-- Past -->
                    <td class="matrix-cell">
                      <div class="matrix-cell-content">
                        <a href="#learn?tense=${pastTense.id}" class="matrix-tense-name">${pastTense.name}</a>
                        <div class="matrix-formula"><code>${pastTense.formulas.affirmative}</code></div>
                        <div class="matrix-sample">"${pastTense.usages[0].example}"</div>
                      </div>
                    </td>

                    <!-- Present -->
                    <td class="matrix-cell">
                      <div class="matrix-cell-content">
                        <a href="#learn?tense=${presTense.id}" class="matrix-tense-name">${presTense.name}</a>
                        <div class="matrix-formula"><code>${presTense.formulas.affirmative}</code></div>
                        <div class="matrix-sample">"${presTense.usages[0].example}"</div>
                      </div>
                    </td>

                    <!-- Future -->
                    <td class="matrix-cell">
                      <div class="matrix-cell-content">
                        <a href="#learn?tense=${futTense.id}" class="matrix-tense-name">${futTense.name}</a>
                        <div class="matrix-formula"><code>${futTense.formulas.affirmative}</code></div>
                        <div class="matrix-sample">"${futTense.usages[0].example}"</div>
                      </div>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ------------------- Irregular Verbs View ------------------- */
  renderVerbsView() {
    const container = document.getElementById("verbs-section");
    if (!container) return;

    container.innerHTML = `
      <div class="verbs-wrapper">
        <div class="verbs-header">
          <h1>Essential Irregular Verbs Reference</h1>
          <p>Master Base (V1), Past Simple (V2), and Past Participle (V3) for accurate tense conjugation.</p>

          <div class="verbs-search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="verbs-filter-input" placeholder="Search any verb (e.g. 'go', 'went', 'gone')..." />
          </div>
        </div>

        <div class="verbs-counter-bar">
          Showing <strong id="verbs-count">${irregularVerbs.length}</strong> irregular verbs
        </div>

        <div class="verbs-table-container">
          <table class="verbs-table">
            <thead>
              <tr>
                <th>Base Form (V1)</th>
                <th>Past Simple (V2)</th>
                <th>Past Participle (V3)</th>
                <th>Audio</th>
              </tr>
            </thead>
            <tbody id="verbs-tbody">
              ${this.buildVerbsRows(irregularVerbs)}
            </tbody>
          </table>
        </div>
      </div>
    `;

    const filterInput = container.querySelector("#verbs-filter-input");
    if (filterInput) {
      filterInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = irregularVerbs.filter(v => 
          v.base.toLowerCase().includes(query) ||
          v.past.toLowerCase().includes(query) ||
          v.participle.toLowerCase().includes(query)
        );
        const tbody = container.querySelector("#verbs-tbody");
        const countSpan = container.querySelector("#verbs-count");
        if (tbody) tbody.innerHTML = this.buildVerbsRows(filtered);
        if (countSpan) countSpan.textContent = filtered.length;
        this.bindVerbSpeechEvents(container);
      });
    }

    this.bindVerbSpeechEvents(container);
  }

  buildVerbsRows(list) {
    if (list.length === 0) {
      return `<tr><td colspan="4" class="text-center py-4">No matching irregular verbs found.</td></tr>`;
    }
    return list.map(v => `
      <tr>
        <td><strong>${v.base}</strong></td>
        <td><span class="v2-tag">${v.past}</span></td>
        <td><span class="v3-tag">${v.participle}</span></td>
        <td>
          <button class="btn-icon verb-speak-btn" data-text="${v.base}, ${v.past}, ${v.participle}" title="Listen to verb forms">🔊</button>
        </td>
      </tr>
    `).join("");
  }

  bindVerbSpeechEvents(container) {
    container.querySelectorAll(".verb-speak-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.text;
        btn.classList.add("speaking");
        speechEngine.speak(text, () => {
          btn.classList.remove("speaking");
        });
      });
    });
  }
}

// Bootstrap Application on DOM Ready
window.addEventListener("DOMContentLoaded", () => {
  new App();
});
