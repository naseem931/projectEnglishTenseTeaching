/**
 * Interactive Timeline Module
 * Visualizes how all 12 English tenses relate on a spatial time continuum
 * (Past <--- Present (NOW) ---> Future).
 */

import { tensesData } from "../data/tensesData.js";

export class TimelineVisualizer {
  constructor(containerId, onSelectTense) {
    this.container = document.getElementById(containerId);
    this.onSelectTense = onSelectTense;
    this.selectedTenseId = "present-simple";
  }

  render(activeTenseId = null) {
    if (!this.container) return;
    if (activeTenseId) {
      this.selectedTenseId = activeTenseId;
    }

    const currentTense = tensesData.find(t => t.id === this.selectedTenseId) || tensesData[0];

    this.container.innerHTML = `
      <div class="timeline-wrapper">
        <div class="timeline-header">
          <div class="timeline-legend">
            <span class="legend-badge past-badge"><span class="dot"></span> Past</span>
            <span class="legend-badge present-badge"><span class="dot"></span> Present (Now)</span>
            <span class="legend-badge future-badge"><span class="dot"></span> Future</span>
          </div>
          <div class="timeline-active-info">
            <span class="badge aspect-${currentTense.aspect}">${currentTense.name}</span>
            <span class="timeline-hint">${currentTense.timeline.label}</span>
          </div>
        </div>

        <!-- Interactive SVG Timeline Graphic -->
        <div class="timeline-graphic-container">
          <svg class="timeline-svg" viewBox="0 0 900 240" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="timeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8"/>
                <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#10b981" stop-opacity="0.8"/>
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <!-- Base Time Axis Line -->
            <line x1="50" y1="120" x2="850" y2="120" stroke="var(--border-color)" stroke-width="4" stroke-linecap="round" />
            <line x1="50" y1="120" x2="850" y2="120" stroke="url(#timeGrad)" stroke-width="3" stroke-linecap="round" stroke-dasharray="6,4" opacity="0.6" />

            <!-- Major Benchmark Zones -->
            <!-- PAST ZONE -->
            <rect x="50" y="30" width="300" height="180" rx="12" fill="var(--color-past-bg)" opacity="0.35" />
            <text x="200" y="55" text-anchor="middle" class="axis-zone-label">PAST</text>

            <!-- PRESENT (NOW) ZONE -->
            <rect x="390" y="20" width="120" height="200" rx="12" fill="var(--color-present-bg)" opacity="0.45" stroke="var(--accent-primary)" stroke-width="1.5" stroke-dasharray="4,3" />
            <text x="450" y="45" text-anchor="middle" class="axis-zone-label" fill="var(--accent-primary)">NOW</text>

            <!-- FUTURE ZONE -->
            <rect x="550" y="30" width="300" height="180" rx="12" fill="var(--color-future-bg)" opacity="0.35" />
            <text x="700" y="55" text-anchor="middle" class="axis-zone-label">FUTURE</text>

            <!-- NOW Indicator Pin -->
            <circle cx="450" cy="120" r="9" fill="var(--accent-primary)" filter="url(#glow)" />
            <circle cx="450" cy="120" r="4" fill="#ffffff" />
            <line x1="450" y1="65" x2="450" y2="175" stroke="var(--accent-primary)" stroke-width="2" stroke-dasharray="3,3" />

            <!-- Dynamic Tense Visualization Markers -->
            ${this.renderTenseSpecificGraphics(currentTense)}
          </svg>
        </div>

        <!-- Tense Quick Picker Slider / Pills -->
        <div class="timeline-quick-tabs">
          <div class="timeline-tabs-row">
            ${tensesData.map(t => `
              <button 
                class="timeline-pill ${t.id === this.selectedTenseId ? 'active' : ''}" 
                data-tense="${t.id}"
                style="--tense-color: ${t.color}">
                <span class="pill-dot" style="background: ${t.color}"></span>
                <span class="pill-name">${t.name}</span>
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Interactive Explanation Card -->
        <div class="timeline-detail-box">
          <div class="timeline-detail-main">
            <h4>${currentTense.name} Timeline Logic</h4>
            <p>${currentTense.timeline.label}</p>
            <div class="timeline-example-bubble">
              <span class="example-icon">💡</span>
              <em>"${currentTense.usages[0].example}"</em>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm jump-to-lesson" data-tense="${currentTense.id}">
            Open Full Lesson &rarr;
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderTenseSpecificGraphics(t) {
    switch (t.id) {
      // 1. Present Simple: Repeating cyclical dots across past, present, and future
      case "present-simple":
        return `
          <g class="marker-group">
            <circle cx="180" cy="120" r="7" fill="${t.color}" />
            <circle cx="270" cy="120" r="7" fill="${t.color}" />
            <circle cx="360" cy="120" r="7" fill="${t.color}" />
            <circle cx="450" cy="120" r="9" fill="${t.color}" filter="url(#glow)" />
            <circle cx="540" cy="120" r="7" fill="${t.color}" />
            <circle cx="630" cy="120" r="7" fill="${t.color}" />
            <circle cx="720" cy="120" r="7" fill="${t.color}" />
            <path d="M 170 150 Q 450 185 730 150" fill="none" stroke="${t.color}" stroke-width="2.5" stroke-dasharray="5,5" />
            <text x="450" y="195" text-anchor="middle" class="svg-annot">Continuous Regular Habit / General Truth</text>
          </g>
        `;

      // 2. Present Continuous: Continuous wave centered over NOW
      case "present-continuous":
        return `
          <g class="marker-group">
            <rect x="380" y="105" width="140" height="30" rx="15" fill="${t.color}" fill-opacity="0.3" stroke="${t.color}" stroke-width="2.5" />
            <text x="450" y="100" text-anchor="middle" class="svg-annot font-bold">In Progress RIGHT NOW</text>
            <circle cx="450" cy="120" r="7" fill="${t.color}" filter="url(#glow)" />
          </g>
        `;

      // 3. Present Perfect: Action initiated in the past, leading to result at NOW
      case "present-perfect":
        return `
          <g class="marker-group">
            <circle cx="260" cy="120" r="8" fill="${t.color}" />
            <text x="260" y="100" text-anchor="middle" class="svg-annot">Past Action</text>
            <path d="M 268 120 C 330 80, 390 80, 442 115" fill="none" stroke="${t.color}" stroke-width="3" stroke-linecap="round" marker-end="url(#arrow)" />
            <text x="350" y="75" text-anchor="middle" class="svg-annot">Connected to Present</text>
            <circle cx="450" cy="120" r="9" fill="${t.color}" filter="url(#glow)" />
            <text x="450" y="150" text-anchor="middle" class="svg-annot font-bold">Present Result</text>
          </g>
        `;

      // 4. Present Perfect Continuous: Bar starting in past and touching NOW
      case "present-perfect-continuous":
        return `
          <g class="marker-group">
            <rect x="220" y="108" width="230" height="24" rx="12" fill="${t.color}" fill-opacity="0.4" stroke="${t.color}" stroke-width="2.5" />
            <circle cx="220" cy="120" r="6" fill="${t.color}" />
            <circle cx="450" cy="120" r="8" fill="${t.color}" filter="url(#glow)" />
            <text x="335" y="95" text-anchor="middle" class="svg-annot font-bold">Duration Rolling Into Now</text>
          </g>
        `;

      // 5. Past Simple: Single discrete point in past
      case "past-simple":
        return `
          <g class="marker-group">
            <circle cx="230" cy="120" r="9" fill="${t.color}" filter="url(#glow)" />
            <text x="230" y="95" text-anchor="middle" class="svg-annot font-bold">Finished Past Event (X)</text>
            <text x="230" y="150" text-anchor="middle" class="svg-annot">Completely finished</text>
          </g>
        `;

      // 6. Past Continuous: Horizontal bar in past interrupted by another event
      case "past-continuous":
        return `
          <g class="marker-group">
            <rect x="140" y="108" width="180" height="24" rx="12" fill="${t.color}" fill-opacity="0.4" stroke="${t.color}" stroke-width="2.5" />
            <text x="230" y="95" text-anchor="middle" class="svg-annot font-bold">Past Activity in Progress</text>
            <line x1="240" y1="90" x2="240" y2="150" stroke="#ef4444" stroke-width="3" />
            <circle cx="240" cy="120" r="6" fill="#ef4444" />
            <text x="240" y="165" text-anchor="middle" class="svg-annot" fill="#ef4444">Interruption (Past Simple)</text>
          </g>
        `;

      // 7. Past Perfect: Past event that occurred before another past event
      case "past-perfect":
        return `
          <g class="marker-group">
            <circle cx="130" cy="120" r="8" fill="${t.color}" filter="url(#glow)" />
            <text x="130" y="95" text-anchor="middle" class="svg-annot font-bold">1st Event (Earlier Past)</text>
            <path d="M 138 120 C 180 90, 220 90, 260 115" fill="none" stroke="${t.color}" stroke-width="2.5" stroke-dasharray="4,4" />
            <circle cx="270" cy="120" r="7" fill="#f59e0b" />
            <text x="270" y="95" text-anchor="middle" class="svg-annot">2nd Event (Past Simple)</text>
          </g>
        `;

      // 8. Past Perfect Continuous: Ongoing duration ending before another past point
      case "past-perfect-continuous":
        return `
          <g class="marker-group">
            <rect x="110" y="108" width="160" height="24" rx="12" fill="${t.color}" fill-opacity="0.4" stroke="${t.color}" stroke-width="2.5" />
            <text x="190" y="95" text-anchor="middle" class="svg-annot font-bold">Ongoing Duration in Earlier Past</text>
            <circle cx="280" cy="120" r="7" fill="#f59e0b" />
            <text x="280" y="145" text-anchor="middle" class="svg-annot">Past Benchmark</text>
          </g>
        `;

      // 9. Future Simple: A point in future
      case "future-simple":
        return `
          <g class="marker-group">
            <circle cx="680" cy="120" r="9" fill="${t.color}" filter="url(#glow)" />
            <text x="680" y="95" text-anchor="middle" class="svg-annot font-bold">Future Action / Decision</text>
            <text x="680" y="150" text-anchor="middle" class="svg-annot">Will happen</text>
          </g>
        `;

      // 10. Future Continuous: A span in future
      case "future-continuous":
        return `
          <g class="marker-group">
            <rect x="610" y="108" width="170" height="24" rx="12" fill="${t.color}" fill-opacity="0.4" stroke="${t.color}" stroke-width="2.5" />
            <circle cx="695" cy="120" r="7" fill="${t.color}" />
            <text x="695" y="95" text-anchor="middle" class="svg-annot font-bold">Action In Progress in Future</text>
          </g>
        `;

      // 11. Future Perfect: Completed before a future deadline
      case "future-perfect":
        return `
          <g class="marker-group">
            <circle cx="630" cy="120" r="8" fill="${t.color}" />
            <text x="630" y="95" text-anchor="middle" class="svg-annot">Action Completed</text>
            <line x1="750" y1="80" x2="750" y2="160" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4" />
            <text x="750" y="70" text-anchor="middle" class="svg-annot font-bold" fill="#ef4444">Future Deadline (BY...)</text>
          </g>
        `;

      // 12. Future Perfect Continuous: Continuous stretch up to a future deadline
      case "future-perfect-continuous":
        return `
          <g class="marker-group">
            <rect x="490" y="108" width="250" height="24" rx="12" fill="${t.color}" fill-opacity="0.4" stroke="${t.color}" stroke-width="2.5" />
            <line x1="750" y1="80" x2="750" y2="160" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4" />
            <text x="615" y="95" text-anchor="middle" class="svg-annot font-bold">Accumulated Duration</text>
            <text x="750" y="70" text-anchor="middle" class="svg-annot font-bold" fill="#ef4444">Deadline Benchmark</text>
          </g>
        `;

      default:
        return "";
    }
  }

  bindEvents() {
    const pills = this.container.querySelectorAll(".timeline-pill");
    pills.forEach(pill => {
      pill.addEventListener("click", () => {
        const tenseId = pill.dataset.tense;
        this.selectedTenseId = tenseId;
        this.render(tenseId);
      });
    });

    const jumpBtn = this.container.querySelector(".jump-to-lesson");
    if (jumpBtn) {
      jumpBtn.addEventListener("click", () => {
        const tenseId = jumpBtn.dataset.tense;
        if (this.onSelectTense) {
          this.onSelectTense(tenseId);
        }
      });
    }
  }
}
