/**
 * Speech Module (Offline Web Speech Synthesis)
 * Provides text-to-speech for sentences, pronunciation, and examples.
 */

export class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.isSupported = !!this.synth;
    this.voice = null;
    this.rate = 0.92; // Slightly measured pace for language learning
    this.pitch = 1.0;

    if (this.isSupported) {
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prefer natural sounding English voices (US, GB, or system default English)
    const preferred = voices.find(v => v.lang.startsWith("en-US") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("English")))
      || voices.find(v => v.lang.startsWith("en-GB"))
      || voices.find(v => v.lang.startsWith("en"))
      || voices[0];
    this.voice = preferred;
  }

  speak(text, onEnd = null) {
    if (!this.isSupported || !text) return;

    // Cancel any previous speech
    this.synth.cancel();

    // Clean text of parentheses or markdown symbols
    const cleanText = text.replace(/[*_#`[\]()]/g, "").trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    if (this.voice) {
      utterance.voice = this.voice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const speechEngine = new SpeechEngine();
