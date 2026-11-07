/**
 * Interactive 3D Flashcards Module
 * Quick recall and formula drilling for all 12 tenses.
 */

import { tensesData } from "../data/tensesData.js";
import { speechEngine } from "./speech.js";

export class FlashcardEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentIndex = 0;
    this.currentCategory = "all";
    this.cards = [];
    this.isFlipped = false;
  }

  init() {
    this.filterCards();
    this.currentIndex = 0;
    this.isFlipped = false;
    this.render();
    this.bindKeyboard();
  }

  filterCards() {
    if (this.currentCategory === "all") {
      this.cards = [...tensesData];
    } else {
      this.cards = tensesData.filter(t => t.category === this.currentCategory);
    }
  }

  render() {
    if (!this.container) return;

    if (this.cards.length === 0) {
      this.container.innerHTML = `<p>No cards found.</p>`;
      return;
    }

    const tense = this.cards[this.currentIndex];

    this.container.innerHTML = `
      <div class="flashcards-wrapper">
        <!-- Controls Bar -->
        <div class="flashcards-top-bar">
          <div class="category-tabs">
            <button class="fc-filter-btn ${this.currentCategory === 'all' ? 'active' : ''}" data-cat="all">All (12)</button>
            <button class="fc-filter-btn ${this.currentCategory === 'present' ? 'active' : ''}" data-cat="present">Present (4)</button>
            <button class="fc-filter-btn ${this.currentCategory === 'past' ? 'active' : ''}" data-cat="past">Past (4)</button>
            <button class="fc-filter-btn ${this.currentCategory === 'future' ? 'active' : ''}" data-cat="future">Future (4)</button>
          </div>
          <div class="fc-counter">Card ${this.currentIndex + 1} of ${this.cards.length}</div>
        </div>

        <!-- 3D Flipping Card Container -->
        <div class="flip-scene">
          <div class="flip-card ${this.isFlipped ? 'is-flipped' : ''}" id="main-flashcard">
            
            <!-- FRONT SIDE -->
            <div class="flip-card-face flip-card-front" style="--accent-border: ${tense.color}">
              <div class="fc-face-header">
                <span class="badge" style="background: ${tense.color}22; color: ${tense.color}; border: 1px solid ${tense.color}55;">
                  ${tense.category.toUpperCase()} • ${tense.aspect.toUpperCase()}
                </span>
                <span class="fc-flip-hint">Click card to reveal formulas ↺</span>
              </div>

              <div class="fc-face-body">
                <h2 class="fc-title">${tense.name}</h2>
                <p class="fc-tagline">${tense.tagline}</p>

                <div class="fc-signals-section">
                  <div class="fc-label">Key Signal Words:</div>
                  <div class="fc-pills">
                    ${tense.signalWords.slice(0, 6).map(w => `<span class="signal-tag">${w}</span>`).join("")}
                  </div>
                </div>

                <div class="fc-example-box">
                  <div class="fc-label">Sample Sentence:</div>
                  <div class="fc-example-text">
                    "${tense.usages[0].example}"
                    <button class="btn-icon speak-btn" data-text="${tense.usages[0].example}" title="Listen to pronunciation">
                      🔊
                    </button>
                  </div>
                </div>
              </div>

              <div class="fc-face-footer">
                <span class="click-to-flip-text">Press <strong>Space</strong> or Tap Card to Flip</span>
              </div>
            </div>

            <!-- BACK SIDE -->
            <div class="flip-card-face flip-card-back" style="--accent-border: ${tense.color}">
              <div class="fc-face-header">
                <h3 class="fc-back-title">${tense.name} Formulas</h3>
                <span class="fc-flip-hint">Click card to return ↻</span>
              </div>

              <div class="fc-face-body">
                <div class="fc-formula-group">
                  <div class="formula-line">
                    <span class="formula-type positive">Affirmative (+)</span>
                    <code>${tense.formulas.affirmative}</code>
                  </div>
                  <div class="formula-line">
                    <span class="formula-type negative">Negative (-)</span>
                    <code>${tense.formulas.negative}</code>
                  </div>
                  <div class="formula-line">
                    <span class="formula-type question">Question (?)</span>
                    <code>${tense.formulas.interrogative}</code>
                  </div>
                </div>

                <div class="fc-pro-tip">
                  <span class="tip-icon">💡</span>
                  <span><strong>Rule of thumb:</strong> ${tense.quickTip}</span>
                </div>
              </div>

              <div class="fc-face-footer">
                <a href="#learn" class="btn btn-outline btn-sm jump-lesson-from-fc" data-tense="${tense.id}">Read Complete Guide &rarr;</a>
              </div>
            </div>

          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flashcards-nav">
          <button id="fc-prev-btn" class="btn btn-secondary ${this.currentIndex === 0 ? 'disabled' : ''}">
            &larr; Previous
          </button>
          <button id="fc-flip-btn" class="btn btn-primary">
            🔄 Flip Card
          </button>
          <button id="fc-next-btn" class="btn btn-secondary ${this.currentIndex === this.cards.length - 1 ? 'disabled' : ''}">
            Next &rarr;
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const card = this.container.querySelector("#main-flashcard");
    const flipBtn = this.container.querySelector("#fc-flip-btn");
    const prevBtn = this.container.querySelector("#fc-prev-btn");
    const nextBtn = this.container.querySelector("#fc-next-btn");

    const toggleFlip = () => {
      this.isFlipped = !this.isFlipped;
      if (card) {
        card.classList.toggle("is-flipped", this.isFlipped);
      }
    };

    if (card) card.addEventListener("click", (e) => {
      if (e.target.closest(".speak-btn") || e.target.closest(".jump-lesson-from-fc")) return;
      toggleFlip();
    });

    if (flipBtn) flipBtn.addEventListener("click", toggleFlip);

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.currentIndex > 0) {
          this.currentIndex -= 1;
          this.isFlipped = false;
          this.render();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.currentIndex < this.cards.length - 1) {
          this.currentIndex += 1;
          this.isFlipped = false;
          this.render();
        }
      });
    }

    // Category filters
    const filterBtns = this.container.querySelectorAll(".fc-filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.currentCategory = btn.dataset.cat;
        this.filterCards();
        this.currentIndex = 0;
        this.isFlipped = false;
        this.render();
      });
    });

    // Pronunciation speak buttons
    const speakBtns = this.container.querySelectorAll(".speak-btn");
    speakBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const text = btn.dataset.text;
        btn.classList.add("speaking");
        speechEngine.speak(text, () => {
          btn.classList.remove("speaking");
        });
      });
    });

    // Jump to lesson link
    const jumpBtn = this.container.querySelector(".jump-lesson-from-fc");
    if (jumpBtn) {
      jumpBtn.addEventListener("click", (e) => {
        const tenseId = jumpBtn.dataset.tense;
        window.location.hash = `#learn?tense=${tenseId}`;
      });
    }
  }

  bindKeyboard() {
    if (this._hasBoundKeyboard) return;
    this._hasBoundKeyboard = true;

    window.addEventListener("keydown", (e) => {
      // Only trigger if flashcards section is visible
      const section = document.getElementById("flashcards-section");
      if (!section || section.classList.contains("hidden")) return;

      if (e.code === "Space") {
        e.preventDefault();
        const flipBtn = this.container.querySelector("#fc-flip-btn");
        if (flipBtn) flipBtn.click();
      } else if (e.code === "ArrowRight") {
        const nextBtn = this.container.querySelector("#fc-next-btn");
        if (nextBtn && !nextBtn.classList.contains("disabled")) nextBtn.click();
      } else if (e.code === "ArrowLeft") {
        const prevBtn = this.container.querySelector("#fc-prev-btn");
        if (prevBtn && !prevBtn.classList.contains("disabled")) prevBtn.click();
      }
    });
  }
}
