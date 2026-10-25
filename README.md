# CodeXP 🦆⚡

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75B2?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_%26_Firestore-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **CodeXP** is a modern, full-stack, gamified coding education platform and intelligent code health evaluator. It empowers learners to master programming languages and systems tools through personalized curricula, simulated execution sandboxes, streak & XP habit tracking, and real-time Rubber Duck code diagnosis powered by Google Gemini AI.

---

## 🌟 Key Highlights & Features

### 1. 🎓 Personalized Multi-Language Learning Paths
Tailored curricula spanning foundational concepts, hands-on practice, and capstone projects across **9 programming languages and developer tools**:
- 🐍 **Python**: Automation, backend scripting, null-safety, and data manipulation.
- ⚡ **JavaScript (ES6+)**: Modern syntax, async/await, closures, and web APIs.
- ☕ **Java**: Object-oriented architecture, strong typing, and enterprise patterns.
- ⚙️ **C++**: High performance, memory mechanics, pointers, and RAII.
- 🐧 **Linux**: Terminal commands, Bash automation, pipelines, and sysadmin safety (`set -euo pipefail`).
- 🧱 **C**: Low-level systems programming, pointers, structs, and memory safety.
- 🌐 **HTML5**: Semantic document structuring, accessibility (a11y), and web standards.
- 🎨 **CSS3**: Modern layouts (Flexbox, Grid), responsive units, and cascade architecture.
- 🗄️ **MySQL**: Relational schemas, optimized queries, indexing, and transactional integrity.

### 2. 🦆 Rubber Duck Code Evaluator ("Professor Quackers")
An AI-powered and heuristic-grounded code diagnostic engine:
- **Dynamic 3-Pillar Code Health Score (0–100)**:
  1. **Variable Definitions & Naming (0–30 pts)**: Evaluates semantic clarity, variable scope (`const`/`let` vs deprecated `var`), leakage of globals, and default argument hygiene.
  2. **Readability & Formatting (0–35 pts)**: Inspects line length limits (≤100 chars), indentation consistency, nesting depth, and docstrings/comments.
  3. **Code Quality & Safety (0–35 pts)**: Identifies language-specific hazards (e.g., `strcpy`/dangling pointers in C/C++, unhandled `None` in Python, unhandled promise rejections in JS, unquoted variables in `rm -rf` bash scripts).
- **Categorized Issue Diagnosis**: Flags *Critical Bugs*, *Warnings*, and *Style Suggestions* with exact line numbers and recommendations.
- **Automated Refactoring**: Produces an optimized, idiomatic rewrite with one-click copy and "Open in Practice Playground".
- **Memorable Duck Wisdom**: Actionable programming mantras delivered with a friendly, witty rubber duck persona.

### 3. 🎮 Gamification & Daily Habit Mechanics
- **Unlimited Practice**: Zero restrictive heart/lives limitations — code and experiment without fear of failure.
- **Daily Streak System**: 7-day visual calendar tracker with celebratory confetti milestones.
- **Streak Freezes**: Safeguard your daily streak during busy days by exchanging earned XP in the shop.
- **Experience Points (XP) & Levels**: Earn XP through lesson completion, warm-ups, and code evaluations.
- **Visual Milestone Badges**: Collect unlockable achievements for streaks, multi-language mastery, and bug hunting.
- **Winding Skill Map**: Interactive sequential learning path with topic mastery levels (*Novice*, *Apprentice*, *Adept*, *Master*) and dynamic difficulty modes (*Warm-up*, *Standard*, *Challenge*).

### 4. 🌓 Ergonomic Themes & Hardware-Level Brightness
- **4 Custom Themes**:
  - `Light`: Crisp, clean daytime palette with subtle natural undertones.
  - `Dim`: Modern dark navy/slate palette designed for low-light coding.
  - `Dark`: Deep charcoal minimalist theme with high contrast.
  - `Night`: Warm sepia OLED-optimized dark theme engineered to minimize eye strain.
- **Screen Brightness Dimmer**: Hardware-simulated software brightness slider (50%–100%) persisted across sessions.
- **Accessible Contrast**: Carefully configured surfaces preventing washed-out text across all dark modes.

### 5. ⚙️ Unified Settings
Consolidates theme mode switcher, screen brightness slider, learning path manager, user account credentials, and session controls into an accessible modal.

---

## 🏗️ System Architecture

CodeXP is built as a unified full-stack application with an Express API backend and a Vite-powered React client:

```
                  ┌─────────────────────────────────────────┐
                  │               Client (SPA)              │
                  │   React 19 + TypeScript + Tailwind v4   │
                  └────────────────────┬────────────────────┘
                                       │
                    HTTP Requests / API Calls (/api/*)
                                       │
                                       ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                          Express Application Server                       │
│                                (server.ts)                                │
├──────────────────────────────────────┬────────────────────────────────────┤
│           Vite Dev Middleware        │          API Endpoints             │
│        (HMR & Module Transform)      │        /api/evaluate-code          │
├──────────────────────────────────────┼────────────────────────────────────┤
│           Static Production          │     Dynamic 3-Pillar Scoring       │
│               File Server            │   Gemini 2.5 Flash + AST Analyzer  │
└──────────────────┬───────────────────┴─────────────────┬──────────────────┘
                   │                                     │
                   ▼                                     ▼
        ┌───────────────────────┐             ┌─────────────────────┐
        │   Firebase Services   │             │   Google Gemini API │
        │  • Authentication     │             │  • @google/genai    │
        │  • Cloud Firestore    │             │  • Structured JSON  │
        └───────────────────────┘             └─────────────────────┘
```

---

## 🔄 Pipelines & Workflows

CodeXP implements structured engineering pipelines for development, quality assurance, build, and production execution:

### 1. Development Pipeline
```bash
npm run dev
```
- Launches the Express backend via `tsx server.ts`.
- In non-production environments, Express mounts Vite as an integrated middleware (`createViteServer` in `middlewareMode`).
- Serves the React application on `http://0.0.0.0:3000` with instant TypeScript transpilations.

### 2. Code Quality & Type-Check Pipeline
```bash
npm run lint
```
- Executes `tsc --noEmit` against the strict `tsconfig.json` configuration.
- Verifies JSX typing, component props, imports, Firebase models, and AST helper integrity without emitting files.

### 3. Production Build Pipeline
```bash
npm run build
```
- Executes Vite production bundler (`vite build`).
- Bundles, tree-shakes, and minifies client-side assets into the `/dist` directory.
- Extracts optimized CSS via `@tailwindcss/vite`.
- Emits pre-cached static chunks for fast load times.

### 4. Production Deployment & Runtime Pipeline
```bash
npm start
```
- Runs `tsx server.ts` with `NODE_ENV=production`.
- Automatically skips Vite middleware initialization.
- Serves pre-built assets from `/dist` via `express.static`.
- Handles single-page application client-side routing by serving `/dist/index.html` for unknown paths.
- Provides graceful shutdown listeners (`SIGTERM`, `SIGINT`) and auto-recovery for port binding.

### 5. Automated Fallback Evaluation Pipeline
When evaluating code via `POST /api/evaluate-code`:
1. **Gemini API Attempt**: Invokes `ai.models.generateContent` with `gemini-2.5-flash` using a strict JSON response schema.
2. **Race Timeout**: A 3.5-second `Promise.race` timeout ensures API calls never hang or block user interaction.
3. **AST-Heuristic Engine Fallback**: If the Gemini API call exceeds the timeout, experiences rate-limits, or lacks an API key, the built-in static code analyzer immediately analyzes the code across the 3 pillars (Variable Naming, Readability, Quality & Safety), returning scores and recommendations.

---

## 📁 Repository Structure

```
codexp/
├── .env.example                  # Template for required environment variables
├── firebase-applet-config.json   # Firebase client project credentials
├── firebase-blueprint.json       # Firestore database schema definitions
├── firestore.rules               # Firestore security & authorization rules
├── index.html                    # Single Page App HTML entry point
├── metadata.json                 # Application configuration & permissions
├── package.json                  # NPM dependencies, scripts, and package metadata
├── server.ts                     # Full-stack Express server & Gemini API endpoints
├── tsconfig.json                 # TypeScript compiler options
├── vite.config.ts                # Vite build and plugin configurations
├── public/                       # Static public assets, icons, and svgs
│   ├── favicon.svg               # Vector brand favicon
│   └── icon.svg                  # Brand icon artwork
└── src/
    ├── App.tsx                   # Main application router, layout & dashboard
    ├── firebase.ts               # Firebase App, Auth & Firestore initialization
    ├── index.css                 # Global Tailwind styles & dark mode color tokens
    ├── main.tsx                  # React DOM root entry point
    ├── vite-env.d.ts             # Vite & client type declarations
    ├── components/
    │   ├── AchievementsView.tsx      # Milestone badge showcase & progress cards
    │   ├── AuthView.tsx              # User registration, email/password & Google login
    │   ├── CodeEvaluatorView.tsx     # Professor Quackers Rubber Duck evaluation UI
    │   ├── CodeLibraryView.tsx       # Snippet repository & syntax guides
    │   ├── DailyPracticeCard.tsx     # Habit counter, daily minute goal & freeze shop
    │   ├── DuckAvatar.tsx            # Animated Duck mascot states (idle, speaking, thinking)
    │   ├── EmailVerificationView.tsx # Account verification flow
    │   ├── InteractiveLessonModal.tsx# In-browser coding workspace & sandbox
    │   ├── LearningTracksView.tsx    # 3-tier language progression tracks
    │   ├── SettingsModal.tsx         # Unified settings (Themes, Brightness, Account)
    │   ├── SkillMap.tsx              # Winding sequential topic mastery map
    │   └── ThemeController.tsx       # Quick theme & brightness adjustment widget
    ├── data/
    │   ├── gamifiedCurriculum.ts     # Topic curricula, practice tasks & starter code
    │   └── learningTracks.ts         # Structured lessons for all 9 programming tracks
    ├── types/
    │   └── gamification.ts           # Type definitions for streaks, topics & mastery
    └── utils/
        ├── achievements.ts           # Milestone calculations & unlock conditions
        ├── confetti.ts               # Canvas confetti particle triggers
        ├── streak.ts                 # Streak evaluation, 7-day history & freeze logic
        └── theme.ts                  # Theme switcher and screen brightness utilities
```

---

## 🚀 Getting Started & Installation

Follow these instructions to set up and run CodeXP locally on your machine.

### Prerequisites

Ensure you have the following installed:
- **Node.js**: `v18.0.0` or higher (recommended: `v20.x` or `v22.x`)
- **Package Manager**: `npm` (comes with Node.js) or `bun` / `pnpm`
- **Google Gemini API Key** *(Optional but recommended for full AI evaluation)*: [Get an API Key](https://aistudio.google.com/)
- **Firebase Project** *(Optional for local testing; included config enables cloud features)*: [Firebase Console](https://console.firebase.google.com/)

---

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/codexp.git
cd codexp
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
Create a `.env` file in the root directory by copying `.env.example`:
```bash
cp .env.example .env
```
Edit `.env` with your preferred settings:
```env
# Port the server will listen on (default: 3000)
PORT=3000

# Required for AI-powered code evaluation via Google Gemini
GEMINI_API_KEY="your_actual_gemini_api_key_here"

# Application host URL (used for redirects and callbacks)
APP_URL="http://localhost:3000"
```

> **Note**: If `GEMINI_API_KEY` is omitted, CodeXP will automatically fall back to its internal static AST code analysis engine.

#### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🛠️ Production Build & Deployment

### Building for Production
To bundle the frontend application for production:
```bash
npm run build
```
This generates the optimized production bundle inside the `/dist` directory.

### Running in Production Mode
Start the production server:
```bash
npm start
```
The server will run on port `3000` (or the port specified in `PORT`), serving the production build with full API support.

### Docker Deployment
You can package CodeXP as a Docker container for deployment to Google Cloud Run, AWS ECS, or any container runtime:

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/firebase-applet-config.json ./firebase-applet-config.json
RUN npm install -g tsx
EXPOSE 3000
CMD ["tsx", "server.ts"]
```

---

## 🔌 API Reference

### Code Evaluation Endpoint

#### `POST /api/evaluate-code`
Evaluates user-submitted code, scoring it dynamically and returning structured feedback.

- **Content-Type**: `application/json`
- **Request Body**:
```json
{
  "code": "def calculate_rewards(users, threshold=100):\n    rewards = []\n    for u in users:\n        if u['score'] > threshold:\n            rewards.append(u['score'] * 0.15)\n    return rewards",
  "language": "Python",
  "filename": "rewards.py",
  "focusArea": "all"
}
```

- **Response Body (`200 OK`)**:
```json
{
  "duckGreeting": "Quack! *Impressed nod* That's some clean code you've floated my way!",
  "overallRating": "Clean Waters",
  "score": 86,
  "summary": "Analyzed 7 lines of code. Evaluated Variable Quality (24/30), Readability & Formatting (32/35), and Safety & Logic (30/35).",
  "strengths": [
    "Clean iteration over user list with readable comprehension.",
    "Comfortable line lengths that fit cleanly into standard code review viewports."
  ],
  "issues": [
    {
      "severity": "warning",
      "line": "Line 4",
      "description": "Potential KeyError or TypeError if user dictionary lacks 'score' key or contains null/None values.",
      "recommendation": "Use defensive retrieval: u.get('score', 0)."
    }
  ],
  "improvements": [
    "Add type annotations to function parameters and return type.",
    "Add defensive dictionary access to guard against missing keys."
  ],
  "improvedCode": "def calculate_rewards(users: list[dict], threshold: float = 100.0) -> list[float]:\n    rewards = []\n    for user in users:\n        score = user.get('score')\n        if score is not None and score > threshold:\n            rewards.append(round(score * 0.15, 2))\n    return rewards\n",
  "duckWisdom": "Quack wisdom: Clean code reads like well-written prose; simple, clear, and leaving nothing to imagination."
}
```

---

## 🔒 Security & Firestore Rules

Database security rules are declared in `firestore.rules`. User data, learning progress, streaks, and settings are isolated by user ID:
- Users can only read and write their own documents under `/users/{userId}`.
- Unauthenticated requests are rejected.
- Progress updates validate data types and ownership before writing.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

1. **Fork the Repository** on GitHub.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "Add amazing new learning module"
   ```
4. **Push to Your Branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
