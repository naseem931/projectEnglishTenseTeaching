/**
 * Interactive Quiz Engine
 * Supports Multiple Choice and Fill-in-the-blank with instant feedback,
 * offline audio synthesis, explanation cards, and streak tracking.
 */

import { quizQuestions } from "../data/quizData.js";
import { tensesData } from "../data/tensesData.js";
import { StorageManager } from "./storage.js";

class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio fallback silent
    }
  }

  playError() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.linearRampToValueAtTime(180, now + 0.2);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Audio fallback silent
    }
  }
}

const sfx = new SoundEffects();

export class QuizEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentTenseFilter = "all";
    this.currentLevelFilter = "all";
    this.questionsPool = [];
    this.currentIndex = 0;
    this.userScore = 0;
    this.answeredCurrent = false;
  }

  init(tenseFilter = "all") {
    this.currentTenseFilter = tenseFilter;
    this.filterQuestions();
    this.currentIndex = 0;
    this.userScore = 0;
    this.render();
  }

  filterQuestions() {
    let list = [...quizQuestions];
    if (this.currentTenseFilter !== "all") {
      list = list.filter(q => q.tenseId === this.currentTenseFilter);
    }
    if (this.currentLevelFilter !== "all") {
      list = list.filter(q => q.level === this.currentLevelFilter);
    }
    // Shuffle questions
    this.questionsPool = this.shuffleArray(list);
  }

  shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  render() {
    if (!this.container) return;

    if (this.questionsPool.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎯</div>
          <h3>No questions match your current filters</h3>
          <p>Try selecting "All Tenses" or a different difficulty level.</p>
          <button class="btn btn-primary reset-filter-btn">Reset Filters</button>
        </div>
      `;
      const btn = this.container.querySelector(".reset-filter-btn");
      if (btn) {
        btn.addEventListener("click", () => {
          this.currentTenseFilter = "all";
          this.currentLevelFilter = "all";
          this.filterQuestions();
          this.render();
        });
      }
      return;
    }

    if (this.currentIndex >= this.questionsPool.length) {
      this.renderSummary();
      return;
    }

    const currentQ = this.questionsPool[this.currentIndex];
    const tenseObj = tensesData.find(t => t.id === currentQ.tenseId);
    const progressPercent = Math.round(((this.currentIndex) / this.questionsPool.length) * 100);
    const stats = StorageManager.getQuizStats();

    this.container.innerHTML = `
      <div class="quiz-card-wrapper">
        <!-- Top Toolbar & Stats -->
        <div class="quiz-header">
          <div class="quiz-filters-bar">
            <select class="form-select tense-quiz-select">
              <option value="all" ${this.currentTenseFilter === "all" ? "selected" : ""}>All Tenses (12)</option>
              ${tensesData.map(t => `
                <option value="${t.id}" ${this.currentTenseFilter === t.id ? "selected" : ""}>${t.name}</option>
              `).join("")}
            </select>

            <div class="difficulty-pills">
              <button class="diff-btn ${this.currentLevelFilter === 'all' ? 'active' : ''}" data-level="all">All</button>
              <button class="diff-btn ${this.currentLevelFilter === 'beginner' ? 'active' : ''}" data-level="beginner">Beginner</button>
              <button class="diff-btn ${this.currentLevelFilter === 'intermediate' ? 'active' : ''}" data-level="intermediate">Intermediate</button>
              <button class="diff-btn ${this.currentLevelFilter === 'advanced' ? 'active' : ''}" data-level="advanced">Advanced</button>
            </div>
          </div>

          <div class="quiz-stats-badge">
            <span class="streak-flame" title="Current Correct Streak">🔥 ${stats.currentStreak} streak</span>
            <span class="score-counter">Score: ${this.userScore}/${this.currentIndex}</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="quiz-progress-track">
          <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
        <div class="quiz-progress-text">Question ${this.currentIndex + 1} of ${this.questionsPool.length}</div>

        <!-- Question Card -->
        <div class="quiz-box animate-fadeIn">
          <div class="quiz-tense-tag">
            <span class="tense-dot" style="background: ${tenseObj?.color || 'var(--accent-primary)'}"></span>
            <span>${tenseObj?.name || 'Tense Challenge'}</span>
            <span class="quiz-difficulty-tag level-${currentQ.level}">${currentQ.level}</span>
          </div>

          <h3 class="quiz-prompt">${this.formatQuestionText(currentQ.question)}</h3>

          ${currentQ.type === "mcq" ? this.renderMCQ(currentQ) : this.renderFillBlank(currentQ)}

          <div id="quiz-feedback-box" class="quiz-feedback hidden"></div>

          <div class="quiz-footer-actions">
            ${currentQ.hint ? `<button id="hint-btn" class="btn btn-outline btn-sm">💡 Show Hint</button>` : `<div></div>`}
            <button id="next-q-btn" class="btn btn-primary hidden">Next Question &rarr;</button>
          </div>
          ${currentQ.hint ? `<div id="hint-display" class="hint-text hidden">💡 <strong>Hint:</strong> ${currentQ.hint}</div>` : ''}
        </div>
      </div>
    `;

    this.bindQuizEvents(currentQ);
  }

  formatQuestionText(text) {
    // Highlight blanks or parenthesized verbs with modern styling
    return text.replace(/__________/g, `<span class="quiz-blank-placeholder">_______</span>`);
  }

  renderMCQ(q) {
    return `
      <div class="quiz-options-grid">
        ${q.options.map((opt, idx) => `
          <button class="quiz-option-btn" data-index="${idx}">
            <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
            <span class="option-text">${opt}</span>
          </button>
        `).join("")}
      </div>
    `;
  }

  renderFillBlank(q) {
    return `
      <div class="quiz-fill-container">
        <div class="fill-input-group">
          <input type="text" id="fill-input" class="fill-input" placeholder="Type your answer here..." autocomplete="off" autocorrect="off" spellcheck="false" />
          <button id="submit-fill-btn" class="btn btn-primary">Check Answer</button>
        </div>
        <p class="fill-subtext">Capitalization does not matter. Contractions (e.g. isn't / is not) are both accepted.</p>
      </div>
    `;
  }

  bindQuizEvents(currentQ) {
    this.answeredCurrent = false;

    // Filter change handlers
    const select = this.container.querySelector(".tense-quiz-select");
    if (select) {
      select.addEventListener("change", (e) => {
        this.currentTenseFilter = e.target.value;
        this.filterQuestions();
        this.currentIndex = 0;
        this.userScore = 0;
        this.render();
      });
    }

    const diffBtns = this.container.querySelectorAll(".diff-btn");
    diffBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.currentLevelFilter = btn.dataset.level;
        this.filterQuestions();
        this.currentIndex = 0;
        this.userScore = 0;
        this.render();
      });
    });

    // Hint toggle
    const hintBtn = this.container.querySelector("#hint-btn");
    const hintDisplay = this.container.querySelector("#hint-display");
    if (hintBtn && hintDisplay) {
      hintBtn.addEventListener("click", () => {
        hintDisplay.classList.toggle("hidden");
      });
    }

    // MCQ clicks
    if (currentQ.type === "mcq") {
      const optionBtns = this.container.querySelectorAll(".quiz-option-btn");
      optionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          if (this.answeredCurrent) return;
          const selectedIdx = parseInt(btn.dataset.index, 10);
          this.handleMCQAnswer(currentQ, selectedIdx, btn, optionBtns);
        });
      });
    }

    // Fill blank submission
    if (currentQ.type === "fill") {
      const input = this.container.querySelector("#fill-input");
      const submitBtn = this.container.querySelector("#submit-fill-btn");

      const handleFill = () => {
        if (this.answeredCurrent) return;
        const val = input.value.trim();
        if (!val) return;
        this.handleFillAnswer(currentQ, val);
      };

      if (submitBtn) submitBtn.addEventListener("click", handleFill);
      if (input) {
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") handleFill();
        });
        setTimeout(() => input.focus(), 150);
      }
    }

    // Next question button
    const nextBtn = this.container.querySelector("#next-q-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.currentIndex += 1;
        this.render();
      });
    }
  }

  handleMCQAnswer(currentQ, selectedIdx, chosenBtn, allBtns) {
    this.answeredCurrent = true;
    const isCorrect = selectedIdx === currentQ.answer;

    allBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === currentQ.answer) {
        btn.classList.add("correct");
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add("incorrect");
      }
    });

    if (isCorrect) {
      this.userScore += 1;
      sfx.playSuccess();
    } else {
      sfx.playError();
    }

    StorageManager.saveQuizResult(isCorrect);
    this.showFeedback(isCorrect, currentQ.explanation);
  }

  handleFillAnswer(currentQ, userInput) {
    this.answeredCurrent = true;
    const normalizedUser = userInput.toLowerCase().replace(/['’]/g, "'").trim();
    const correctAnswers = (currentQ.acceptableAnswers || [currentQ.answer]).map(a => a.toLowerCase().replace(/['’]/g, "'").trim());

    const isCorrect = correctAnswers.includes(normalizedUser);

    const input = this.container.querySelector("#fill-input");
    const submitBtn = this.container.querySelector("#submit-fill-btn");
    if (input) {
      input.disabled = true;
      input.classList.add(isCorrect ? "input-correct" : "input-incorrect");
    }
    if (submitBtn) submitBtn.disabled = true;

    if (isCorrect) {
      this.userScore += 1;
      sfx.playSuccess();
    } else {
      sfx.playError();
    }

    StorageManager.saveQuizResult(isCorrect);
    const feedbackText = isCorrect 
      ? `Correct! Answer: <strong>${currentQ.answer}</strong><br>${currentQ.explanation}`
      : `Not quite. Correct answer: <strong>${currentQ.answer}</strong><br>${currentQ.explanation}`;

    this.showFeedback(isCorrect, feedbackText);
  }

  showFeedback(isCorrect, explanationHtml) {
    const feedbackBox = this.container.querySelector("#quiz-feedback-box");
    const nextBtn = this.container.querySelector("#next-q-btn");

    if (feedbackBox) {
      feedbackBox.classList.remove("hidden");
      feedbackBox.className = `quiz-feedback ${isCorrect ? "feedback-success" : "feedback-danger"} animate-fadeIn`;
      feedbackBox.innerHTML = `
        <div class="feedback-title">${isCorrect ? "🎉 Excellent! That is correct!" : "❌ Not quite right."}</div>
        <p class="feedback-body">${explanationHtml}</p>
      `;
    }

    if (nextBtn) {
      nextBtn.classList.remove("hidden");
      nextBtn.focus();
    }
  }

  renderSummary() {
    const percentage = Math.round((this.userScore / this.questionsPool.length) * 100);
    let title = "Nice effort!";
    let emoji = "📘";
    if (percentage >= 90) {
      title = "Grammar Master!";
      emoji = "🏆";
    } else if (percentage >= 70) {
      title = "Great Job!";
      emoji = "🌟";
    }

    this.container.innerHTML = `
      <div class="quiz-summary-card animate-scaleUp">
        <div class="summary-emoji">${emoji}</div>
        <h2>${title}</h2>
        <p class="summary-subtitle">You completed the session</p>

        <div class="summary-score-circle">
          <div class="circle-val">${percentage}%</div>
          <div class="circle-sub">${this.userScore} of ${this.questionsPool.length} correct</div>
        </div>

        <div class="summary-actions">
          <button id="retry-quiz-btn" class="btn btn-primary">Try Another Round</button>
          <a href="#timeline" class="btn btn-secondary">Review Timeline</a>
        </div>
      </div>
    `;

    const retryBtn = this.container.querySelector("#retry-quiz-btn");
    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        this.filterQuestions();
        this.currentIndex = 0;
        this.userScore = 0;
        this.render();
      });
    }
  }
}
