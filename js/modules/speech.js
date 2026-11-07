/**
 * Speech Module
 * 1. Web Speech Synthesis (Text-to-Speech) for offline audio narration.
 * 2. Web Speech Recognition (Speech-to-Text) for "Study by Telling" oral practice.
 */

export class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.isSupported = !!this.synth;
    this.voice = null;
    this.rate = 0.92;
    this.pitch = 1.0;

    if (this.isSupported) {
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }

    // Voice Recognition (Dictation / Telling)
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    this.recognition = SpeechRec ? new SpeechRec() : null;
    this.isRecognitionSupported = !!this.recognition;
    this.isListening = false;

    if (this.isRecognitionSupported) {
      this.recognition.lang = "en-US";
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 3;
    }
  }

  initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    const preferred = voices.find(v => v.lang.startsWith("en-US") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("English")))
      || voices.find(v => v.lang.startsWith("en-GB"))
      || voices.find(v => v.lang.startsWith("en"))
      || voices[0];
    this.voice = preferred;
  }

  speak(text, onEnd = null) {
    if (!this.isSupported || !text) return;

    this.synth.cancel();
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

  /* ------------------- Speech Recognition (Telling) ------------------- */
  listenOnce(onResult, onError = null, onEnd = null) {
    if (!this.isRecognitionSupported) {
      if (onError) onError("Speech recognition is not supported in this browser. You can type or tap the choices instead.");
      return;
    }

    if (this.isListening) {
      try { this.recognition.abort(); } catch {}
      this.isListening = false;
    }

    this.recognition.onresult = (event) => {
      this.isListening = false;
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      if (onResult) onResult(transcript, confidence);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (err) {
      this.isListening = false;
      if (onError) onError(err.message);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
      this.isListening = false;
    }
  }
}

export const speechEngine = new SpeechEngine();
