# Alchemist's Cauldron
This [task](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/game-alchemists-cauldron/README.md) is part of the RS School Qualifying Stage.

## Game Goal
The primary objective is to mix available ingredients into a cauldron to match target ranges across three key parameters:
- **Temperature**
- **Density**
- **Magic Power**

---

## General Structure of the Task Set
- [ ] **Precondition – Setup & Tooling:**
  - Repository initialization and clean project setup.
  - Development tooling configuration.
  - Code architecture and modular folder structure.
 

- [ ] **Level 1 – Basic Game:**
  - Implementation of a complete playable game loop with fixed rule set.
  - Core UI layout.
  - Random recipe generation from the predefined recipe pool.
  - Ingredient stock tracking.
  - Win/loss validation logic and game over screen.


- [ ] **Level 2 – Extended Features:**
  - Difficulty Selection.
  - Save / Continue.
  - Leaderboard / High Scores.


- [ ] **Level 3 – Full Game Experience:**
  - Interactive Controls.
  - Tooltips.
  - Chemical Reactions.
  - Pour Out Action.
  - Keyboard Shortcuts.
  - Visual Feedback & Audio/Visual Polish.

---

## Tech Stack:
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Sass
- **Linter & Formatter**: ESLint & Prettier
- **Git Hooks**: Husky

---

## Available Scripts
- **npm run dev** — Starts the local development server.
- **npm run build** — Compiles TypeScript and builds the project for production.
- **npm run preview** — Locally preview the production build.
- **npm run lint** — Runs ESLint across the codebase.
- **npm run format:fix** — Formats all files using Prettier.