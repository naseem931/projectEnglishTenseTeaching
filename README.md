# 🎓 TenseCraft — Modern English Tense Teaching App

A comprehensive, responsive, 100% offline English tense learning web application built with **Modern JavaScript (ES6+ Modules)**, **Vanilla CSS Custom Properties**, and a **Progressive Web App (PWA) Service Worker**.

Designed for **Desktop, Tablet, and Mobile** with seamless **Dark & Light Mode**, native **Web Speech API offline audio pronunciation**, an **Interactive Visual Timeline**, and **3D Flashcards**.

---

## 🚀 Live Demo & GitHub Pages Deployment

This application is **100% static** and designed to deploy immediately to **GitHub Pages** with zero build configuration!

### How to Publish to Your GitHub Pages:

#### Step 1: Create a New GitHub Repository
1. Visit [github.com/new](https://github.com/new).
2. Enter a repository name (e.g., `tensecraft` or `english-tenses`).
3. Set visibility to **Public**.
4. Leave other options unchecked and click **Create repository**.

#### Step 2: Push Your Code
Open PowerShell or your terminal inside this folder (`english-teach`) and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git branch -M main
git push -u origin main
```
*(Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with your actual GitHub account and repository name)*

#### Step 3: Enable GitHub Pages
1. On your GitHub repository page, go to **Settings** &rarr; **Pages** (in the left sidebar).
2. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` and folder `/ (root)`
   - Click **Save**.
3. Alternatively, you can select **GitHub Actions** as source — a pre-configured `.github/workflows/deploy.yml` is already included in this repository!
4. Within 1–2 minutes, your live site will be ready at:
   ```text
   https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/
   ```

---

## 🌟 Key Features

### 1. 📖 Complete 12 English Tenses Coverage
- **Present Tenses**: Present Simple, Present Continuous, Present Perfect, Present Perfect Continuous.
- **Past Tenses**: Past Simple, Past Continuous, Past Perfect, Past Perfect Continuous.
- **Future Tenses**: Future Simple, Future Continuous, Future Perfect, Future Perfect Continuous.
- **Detailed Lessons**:
  - Formulas broken down for **Affirmative (+)**, **Negative (-)**, and **Interrogative (?)**.
  - Real-world usage scenarios with audio pronunciation buttons.
  - Common signal words cloud.
  - "DON'T SAY vs. DO SAY" common mistake comparisons with reasons.
  - Memory mnemonics and pro tips.

### 2. 📍 Interactive Spatial Timeline Visualizer
- Visual continuum: `[ PAST ] <======== [ PRESENT / NOW ] ========> [ FUTURE ]`.
- Live SVG markers, duration bars, and benchmark indicators showing exactly when an action occurs.
- Quick tense selector pills for spatial comparison.

### 3. 🎯 Practice & Interactive Quiz Engine
- Multiple choice and fill-in-the-blank questions.
- Instant colored feedback (green/red) with detailed grammatical explanations.
- Offline audio sound effects using native Web Audio synthesis.
- Difficulty filter (Beginner, Intermediate, Advanced).
- Progress bar, score counter, and daily streak tracking stored in `localStorage`.

### 4. 🗂️ 3D Flashcards with Flip Animation
- Realistic 3D card rotation using CSS `perspective` and `transform-style: preserve-3d`.
- Front side: Tense name, signal words, sample sentence with audio.
- Back side: Complete formula breakdown and rule of thumb.
- Keyboard support (`Space` to flip, `Left`/`Right` arrow keys to navigate).

### 5. 🎙️ Study by Telling Mode (Interactive Story Studio & Voice Dictation)
- **Interactive Storytelling**:
  - Narrative scenarios (*The Midnight Museum Mystery*, *Mission to Mars 2045*, *A Day in Tokyo*).
  - Practice tenses in realistic narrative flow by advancing story chapters.
  - **Oral Voice Telling (Microphone)**: Speak answers aloud using Web Speech recognition (or tap options).
  - Full audio narration playback of completed story chapters.
- **Speaking Studio (Prompts)**:
  - Structured storytelling missions requiring specific target tenses.
  - Voice dictation and automated tense feedback.

### 6. 📊 Comparison Matrix (Cheat Sheet)
- Side-by-side comparison table of all 12 tenses grouped by Aspect (Simple, Continuous, Perfect, Perfect Continuous).

### 6. 📝 Irregular Verbs Reference
- Searchable directory of 98+ essential irregular verbs.
- Base Form (V1), Past Simple (V2), and Past Participle (V3).
- Instant offline audio pronunciation for all forms.

### 7. 🌓 Dark & Light Mode
- One-click toggle with smooth CSS transitions.
- Automatically detects OS preference (`prefers-color-scheme`).
- Persists user selection across sessions in `localStorage`.

### 8. 📱 100% Responsive Design
- **Desktop (> 1024px)**: Fixed sleek sidebar, spacious grid, persistent stats.
- **Tablet (768px – 1024px)**: Responsive 2-column layout with sliding drawer.
- **Mobile (< 768px)**: Bottom quick-navigation thumb bar, collapsible menu, touch-friendly buttons.

### 9. ⚡ 100% Offline Capable (PWA)
- Built with a **Service Worker** (`sw.js`) utilizing a Cache-First strategy.
- Complete **Web App Manifest** (`manifest.json`) for installation on iOS, Android, and Desktop as a standalone app.
- Zero remote CDN dependencies — works on airplanes, subways, and low-connectivity environments.

---

## 🛠️ Project Structure

```text
english-teach/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages CI/CD workflow
├── css/
│   └── main.css              # Custom properties, responsive styles & animations
├── icons/
│   └── icon.svg              # Scalable vector application logo
├── js/
│   ├── data/
│   │   ├── tensesData.js     # Comprehensive dataset for all 12 tenses
│   │   ├── quizData.js       # Interactive quiz question pool & explanations
│   │   └── irregularVerbs.js # 98+ irregular verb conjugations
│   ├── modules/
│   │   ├── storage.js        # LocalStorage (theme, streak, scores, bookmarks)
│   │   ├── speech.js         # Offline Web Speech API TTS engine
│   │   ├── timeline.js       # SVG interactive tense continuum visualizer
│   │   ├── quiz.js           # Quiz engine with audio synthesis feedback
│   │   └── flashcards.js     # 3D interactive flashcards
│   └── app.js                # App router, theme switcher & state controller
├── .gitignore
├── .nojekyll                 # Ensures GitHub Pages serves modern ES modules
├── index.html                # Semantic HTML5 single-page application
├── manifest.json             # PWA Web App Manifest
├── README.md                 # Documentation and setup guide
└── sw.js                     # Offline Service Worker cache
```

---

## 💻 Running Locally

Because this project uses standard ES6 modules, simply serve the folder using any local static server:

```bash
# Using Node.js (npx)
npx serve .

# OR using Python 3
python -m http.server 8000
```

Open `http://localhost:8000` or `http://localhost:3000` in your web browser.

---

## 📄 Commercial License & Copyright
Copyright (c) 2026. All rights reserved.

**Commercial Use Authorized:**
You have full ownership to commercialize, monetize, license, rebrand, and distribute this application as a standalone commercial product, web platform, or SaaS service without third-party royalties.
