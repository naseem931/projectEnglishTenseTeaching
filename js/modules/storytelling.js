/**
 * Study by Telling Module
 * Interactive Storyteller & Oral Speaking Studio for English Tenses.
 */

import { storiesData, tellingPrompts } from "../data/storiesData.js";
import { speechEngine } from "./speech.js";

export class StorytellingEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentMode = "story"; // "story" or "prompts"
    this.selectedStoryId = storiesData[0].id;
    this.currentSceneIndex = 0;
    this.completedScenes = [];
    this.isListening = false;
    this.selectedPromptId = tellingPrompts[0].id;
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="story-wrapper">
        <!-- Top Mode Selector -->
        <div class="story-top-tabs">
          <button class="mode-tab-btn ${this.currentMode === 'story' ? 'active' : ''}" data-mode="story">
            📖 Interactive Storytelling
          </button>
          <button class="mode-tab-btn ${this.currentMode === 'prompts' ? 'active' : ''}" data-mode="prompts">
            🎙️ Tell Your Own Story (Speaking Studio)
          </button>
        </div>

        ${this.currentMode === "story" ? this.renderStoryMode() : this.renderPromptsMode()}
      </div>
    `;

    this.bindGlobalEvents();
  }

  /* ------------------- Interactive Story Mode ------------------- */
  renderStoryMode() {
    const story = storiesData.find(s => s.id === this.selectedStoryId) || storiesData[0];
    const isCompleted = this.currentSceneIndex >= story.scenes.length;
    const currentScene = !isCompleted ? story.scenes[this.currentSceneIndex] : null;

    return `
      <!-- Story Picker Carousel / Cards -->
      <div class="story-selector-bar">
        ${storiesData.map(s => `
          <button class="story-card-tab ${s.id === this.selectedStoryId ? 'active' : ''}" data-story="${s.id}" style="--tab-accent: ${s.color}">
            <span class="story-tab-icon">${s.icon}</span>
            <div class="story-tab-info">
              <span class="story-tab-title">${s.title}</span>
              <span class="story-tab-sub">${s.subtitle}</span>
            </div>
          </button>
        `).join("")}
      </div>

      <!-- Main Story Book Layout -->
      <div class="storybook-container animate-fadeIn">
        <div class="storybook-header">
          <div class="storybook-title-group">
            <span class="story-badge">${story.icon} Narrative Studio</span>
            <h2>${story.title}</h2>
            <p class="story-intro-text">${story.intro}</p>
          </div>

          <div class="target-tenses-pill">
            <span class="tenses-label">Focus Tenses:</span>
            <div class="tenses-tag-list">
              ${story.targetTenses.map(t => `<span class="target-tag">${t}</span>`).join("")}
            </div>
          </div>
        </div>

        <!-- Manuscript / Written Progress -->
        <div class="story-manuscript-box">
          <div class="manuscript-label">Story Transcript:</div>
          <div class="manuscript-text" id="manuscript-container">
            ${this.completedScenes.map((cs, idx) => `
              <p class="manuscript-para animate-fadeIn">
                <span class="scene-num">${idx + 1}.</span> 
                ${cs.narrationBefore} 
                <strong class="manuscript-highlight">${cs.fullSentence}</strong>
                <button class="btn-icon speak-btn inline-speak" data-text="${cs.narrationBefore} ${cs.fullSentence}" title="Listen to this scene">🔊</button>
              </p>
            `).join("")}
            
            ${!isCompleted ? `
              <p class="manuscript-current">
                <span class="scene-num">${this.currentSceneIndex + 1}.</span>
                ${currentScene.narrationBefore}
                <span class="current-blank-prompt">${currentScene.prompt.replace(/__________/, `<span class="blank-highlight">_________</span>`)}</span>
              </p>
            ` : `
              <div class="story-conclusion-card animate-scaleUp">
                <div class="conclusion-icon">🎉</div>
                <h3>Story Complete!</h3>
                <p>${story.conclusion}</p>
                <div class="conclusion-actions">
                  <button id="read-full-story-btn" class="btn btn-primary">
                    🔊 Narrate Full Story
                  </button>
                  <button id="replay-story-btn" class="btn btn-secondary">
                    🔄 Retell This Story
                  </button>
                </div>
              </div>
            `}
          </div>
        </div>

        ${!isCompleted ? this.renderTellingChallenge(currentScene) : ""}
      </div>
    `;
  }

  renderTellingChallenge(scene) {
    const isMicAvailable = speechEngine.isRecognitionSupported;

    return `
      <div class="telling-challenge-box animate-fadeIn">
        <div class="challenge-header">
          <span class="challenge-icon">🎙️</span>
          <div>
            <h4>Tell the next action in the story:</h4>
            <p class="challenge-sub">Speak aloud using your microphone or select the proper tense below.</p>
          </div>
        </div>

        <!-- Speaking Microphone Row -->
        <div class="voice-telling-control">
          <button id="mic-tell-btn" class="mic-tell-button ${this.isListening ? 'listening' : ''}" title="${isMicAvailable ? 'Click and speak your answer' : 'Speech recognition not available on this browser'}">
            <span class="mic-icon">${this.isListening ? '🛑' : '🎙️'}</span>
            <span class="mic-text">${this.isListening ? 'Listening... Speak now!' : 'Click to Tell Aloud'}</span>
          </button>
          <div id="speech-transcript-box" class="speech-transcript-pill ${this.isListening ? 'active' : ''}">
            ${this.isListening ? 'Listening for your voice...' : 'Say your answer or choose below'}
          </div>
        </div>

        <!-- Interactive Choice Options -->
        <div class="telling-options-grid">
          ${scene.options.map((opt, idx) => `
            <button class="tell-option-btn" data-index="${idx}">
              <span class="opt-num">${idx + 1}</span>
              <span class="opt-text">${opt}</span>
            </button>
          `).join("")}
        </div>

        <!-- Feedback Box -->
        <div id="telling-feedback-box" class="telling-feedback hidden"></div>

        <div class="telling-footer-actions">
          <button id="next-scene-btn" class="btn btn-primary hidden">Continue Story &rarr;</button>
        </div>
      </div>
    `;
  }

  /* ------------------- Prompts / Tell Your Own Mode ------------------- */
  renderPromptsMode() {
    const prompt = tellingPrompts.find(p => p.id === this.selectedPromptId) || tellingPrompts[0];

    return `
      <div class="prompts-studio-container animate-fadeIn">
        <!-- Prompt Tabs -->
        <div class="prompt-tabs-bar">
          ${tellingPrompts.map(p => `
            <button class="prompt-tab-btn ${p.id === this.selectedPromptId ? 'active' : ''}" data-prompt="${p.id}">
              ${p.title}
            </button>
          `).join("")}
        </div>

        <!-- Active Prompt Card -->
        <div class="prompt-active-card">
          <div class="prompt-card-header">
            <h3>${prompt.title}</h3>
            <div class="prompt-tenses-strip">
              <span>Required Tenses:</span>
              ${prompt.tensesRequired.map(t => `<span class="badge prompt-tense-badge">${t}</span>`).join("")}
            </div>
          </div>

          <div class="prompt-instructions">
            <div class="instruction-icon">💡</div>
            <div>
              <strong>Story Mission:</strong>
              <p>${prompt.guide}</p>
            </div>
          </div>

          <!-- Dictation / Text Area -->
          <div class="studio-input-area">
            <div class="studio-input-toolbar">
              <button id="studio-mic-btn" class="btn btn-outline btn-sm ${this.isListening ? 'listening' : ''}">
                🎙️ ${this.isListening ? 'Stop Listening' : 'Dictate with Voice'}
              </button>
              <button id="listen-sample-btn" class="btn btn-secondary btn-sm" data-sample="${prompt.sample}">
                🔊 Hear Model Story
              </button>
            </div>

            <textarea id="studio-story-text" class="studio-textarea" rows="4" placeholder="Tell your story here... You can click 'Dictate with Voice' to speak it aloud or type it!"></textarea>

            <div class="studio-actions-row">
              <button id="analyze-story-btn" class="btn btn-primary">
                ✨ Check My Story &amp; Tenses
              </button>
            </div>

            <div id="studio-analysis-result" class="analysis-result-box hidden"></div>
          </div>

          <!-- Model Sample Accordion -->
          <div class="model-story-accordion">
            <details>
              <summary><strong>View Model Example Story</strong></summary>
              <p class="sample-story-text">"${prompt.sample}"</p>
            </details>
          </div>
        </div>
      </div>
    `;
  }

  /* ------------------- Event Handling ------------------- */
  bindGlobalEvents() {
    // Mode tabs
    this.container.querySelectorAll(".mode-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.currentMode = btn.dataset.mode;
        this.render();
      });
    });

    if (this.currentMode === "story") {
      this.bindStoryEvents();
    } else {
      this.bindPromptsEvents();
    }
  }

  bindStoryEvents() {
    const story = storiesData.find(s => s.id === this.selectedStoryId) || storiesData[0];
    const isCompleted = this.currentSceneIndex >= story.scenes.length;

    // Story tab switching
    this.container.querySelectorAll(".story-card-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        this.selectedStoryId = tab.dataset.story;
        this.currentSceneIndex = 0;
        this.completedScenes = [];
        this.render();
      });
    });

    // Inline audio narration buttons
    this.container.querySelectorAll(".inline-speak").forEach(btn => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.text;
        btn.classList.add("speaking");
        speechEngine.speak(text, () => btn.classList.remove("speaking"));
      });
    });

    if (isCompleted) {
      // Read entire story
      const readAllBtn = this.container.querySelector("#read-full-story-btn");
      if (readAllBtn) {
        readAllBtn.addEventListener("click", () => {
          const fullText = this.completedScenes.map(cs => `${cs.narrationBefore} ${cs.fullSentence}`).join(" ");
          readAllBtn.classList.add("speaking");
          speechEngine.speak(fullText, () => readAllBtn.classList.remove("speaking"));
        });
      }

      // Replay story
      const replayBtn = this.container.querySelector("#replay-story-btn");
      if (replayBtn) {
        replayBtn.addEventListener("click", () => {
          this.currentSceneIndex = 0;
          this.completedScenes = [];
          this.render();
        });
      }
      return;
    }

    const currentScene = story.scenes[this.currentSceneIndex];

    // Choice button clicks
    this.container.querySelectorAll(".tell-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const selectedIdx = parseInt(btn.dataset.index, 10);
        this.handleSceneAnswer(currentScene, selectedIdx === currentScene.correctIndex, currentScene.options[selectedIdx]);
      });
    });

    // Microphone speech recognition button
    const micBtn = this.container.querySelector("#mic-tell-btn");
    const transcriptPill = this.container.querySelector("#speech-transcript-box");

    if (micBtn) {
      micBtn.addEventListener("click", () => {
        if (!speechEngine.isRecognitionSupported) {
          alert("Web Speech Recognition is not supported by your current browser. You can still select the options to continue!");
          return;
        }

        if (this.isListening) {
          speechEngine.stopListening();
          this.isListening = false;
          micBtn.classList.remove("listening");
          return;
        }

        this.isListening = true;
        micBtn.classList.add("listening");
        if (transcriptPill) transcriptPill.textContent = "Listening... Speak your answer now!";

        speechEngine.listenOnce(
          (spokenText) => {
            this.isListening = false;
            micBtn.classList.remove("listening");
            if (transcriptPill) transcriptPill.textContent = `You said: "${spokenText}"`;

            // Check if spoken text contains the accepted phrase
            const normalizedSpoken = spokenText.toLowerCase();
            const isMatch = currentScene.acceptedPhrases.some(p => normalizedSpoken.includes(p.toLowerCase()));

            this.handleSceneAnswer(currentScene, isMatch, spokenText);
          },
          (err) => {
            this.isListening = false;
            micBtn.classList.remove("listening");
            if (transcriptPill) transcriptPill.textContent = `Microphone notice: ${err || "Could not hear speech"}. Tap a choice below!`;
          },
          () => {
            this.isListening = false;
            micBtn.classList.remove("listening");
          }
        );
      });
    }

    // Continue to next scene
    const nextBtn = this.container.querySelector("#next-scene-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.currentSceneIndex += 1;
        this.render();
      });
    }
  }

  handleSceneAnswer(scene, isCorrect, chosenText) {
    const feedbackBox = this.container.querySelector("#telling-feedback-box");
    const nextBtn = this.container.querySelector("#next-scene-btn");
    const optionBtns = this.container.querySelectorAll(".tell-option-btn");

    optionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === scene.correctIndex) {
        btn.classList.add("correct");
      } else if (!isCorrect && btn.querySelector(".opt-text").textContent.trim() === chosenText) {
        btn.classList.add("incorrect");
      }
    });

    if (feedbackBox) {
      feedbackBox.classList.remove("hidden");
      feedbackBox.className = `telling-feedback ${isCorrect ? 'feedback-success' : 'feedback-danger'} animate-fadeIn`;
      feedbackBox.innerHTML = `
        <div class="feedback-title">${isCorrect ? '✨ Brilliant Storytelling!' : '❌ Not quite the right tense.'}</div>
        <p class="feedback-desc">
          <strong>Tense:</strong> ${scene.tenseUsed}<br>
          <strong>Why:</strong> ${scene.tenseReason}
        </p>
      `;
    }

    if (isCorrect) {
      this.completedScenes.push(scene);
      // Speak the completed sentence aloud
      speechEngine.speak(scene.fullSentence);
    }

    if (nextBtn) {
      nextBtn.classList.remove("hidden");
      nextBtn.focus();
    }
  }

  /* ------------------- Prompts Studio Events ------------------- */
  bindPromptsEvents() {
    // Prompt switching
    this.container.querySelectorAll(".prompt-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.selectedPromptId = btn.dataset.prompt;
        this.render();
      });
    });

    const prompt = tellingPrompts.find(p => p.id === this.selectedPromptId) || tellingPrompts[0];
    const textarea = this.container.querySelector("#studio-story-text");
    const micBtn = this.container.querySelector("#studio-mic-btn");
    const sampleBtn = this.container.querySelector("#listen-sample-btn");
    const checkBtn = this.container.querySelector("#analyze-story-btn");
    const resultBox = this.container.querySelector("#studio-analysis-result");

    // Listen to sample audio
    if (sampleBtn) {
      sampleBtn.addEventListener("click", () => {
        sampleBtn.classList.add("speaking");
        speechEngine.speak(prompt.sample, () => sampleBtn.classList.remove("speaking"));
      });
    }

    // Voice dictation
    if (micBtn && textarea) {
      micBtn.addEventListener("click", () => {
        if (!speechEngine.isRecognitionSupported) {
          alert("Web Speech Recognition is not supported by your current browser. You can type your story directly!");
          return;
        }

        if (this.isListening) {
          speechEngine.stopListening();
          this.isListening = false;
          micBtn.classList.remove("listening");
          micBtn.innerHTML = "🎙️ Dictate with Voice";
          return;
        }

        this.isListening = true;
        micBtn.classList.add("listening");
        micBtn.innerHTML = "🛑 Listening... Speak now";

        speechEngine.listenOnce(
          (transcript) => {
            this.isListening = false;
            micBtn.classList.remove("listening");
            micBtn.innerHTML = "🎙️ Dictate with Voice";
            textarea.value = (textarea.value ? textarea.value + " " : "") + transcript;
          },
          (err) => {
            this.isListening = false;
            micBtn.classList.remove("listening");
            micBtn.innerHTML = "🎙️ Dictate with Voice";
          },
          () => {
            this.isListening = false;
            micBtn.classList.remove("listening");
            micBtn.innerHTML = "🎙️ Dictate with Voice";
          }
        );
      });
    }

    // Check story button
    if (checkBtn && textarea && resultBox) {
      checkBtn.addEventListener("click", () => {
        const text = textarea.value.trim();
        if (!text) {
          alert("Please tell or type a short story first!");
          return;
        }

        const words = text.split(/\s+/).length;
        resultBox.classList.remove("hidden");
        resultBox.className = "analysis-result-box animate-fadeIn";
        resultBox.innerHTML = `
          <div class="result-header">
            <span class="icon">🏆</span>
            <h4>Storyteller Feedback</h4>
          </div>
          <p><strong>Your Story (${words} words):</strong></p>
          <blockquote class="user-story-quote">"${text}"</blockquote>
          <div class="feedback-breakdown">
            <p>✔ <strong>Story Delivered:</strong> You practiced oral and written tense expression!</p>
            <p>💡 <strong>Self-Check:</strong> Compare your sentence verbs with the target tenses (${prompt.tensesRequired.join(", ")}).</p>
          </div>
          <button id="narrate-user-story-btn" class="btn btn-secondary btn-sm mt-2">
            🔊 Listen to Your Story Read Aloud
          </button>
        `;

        const narrateBtn = resultBox.querySelector("#narrate-user-story-btn");
        if (narrateBtn) {
          narrateBtn.addEventListener("click", () => {
            narrateBtn.classList.add("speaking");
            speechEngine.speak(text, () => narrateBtn.classList.remove("speaking"));
          });
        }
      });
    }
  }
}
