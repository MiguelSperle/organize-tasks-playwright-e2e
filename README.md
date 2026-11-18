# Organize Tasks – E2E Tests

End-to-end (E2E) test project for the [Sauce Demo](https://www.saucedemo.com) website, written with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** pattern.

> 📌 **Status:** work in progress.

---

## 📑 Table of contents

1. [Overview](#-overview)
2. [Tech stack](#-tech-stack)
3. [Prerequisites and installation](#-prerequisites-and-installation)
4. [Project structure](#-project-structure)
5. [Core concepts](#-core-concepts)
6. [Conventions](#-conventions)

---

## 🎯 Overview

The goal of this project is to validate the main Organize Tasks flows through the UI, in the same way a real user would.

---

## 🛠 Tech stack

| Technology | Purpose |
| --- | --- |
| [Playwright](https://playwright.dev) | Execution and assertions of E2E tests |
| [TypeScript](https://www.typescriptlang.org) | Typing and code organization |
| [Node.js](https://nodejs.org) / [npm](https://www.npmjs.com) | Management and execution of dependencies |

---

## ✅ Prerequisites and installation

**Prerequisites:** [Node.js](https://nodejs.org) (LTS version recommended) and npm.

```bash
# 1. Clone the repository
git clone <repository-url>
cd organize-tasks-playwright-e2e

# 2. Install dependencies
npm install

# 3. Install the Playwright browsers
npx playwright install
```

---

## ▶️ Running the tests

```bash
# Run all tests
npx playwright test

# Run a specific file
npx playwright test tests/file-name.spec.ts

# Run tests by title
npx playwright test -g "specific test title"

# Run with the Playwright UI mode
npx playwright test --ui

# Run with the browser visible
npx playwright test --headed

# Open the report from the last run
npx playwright show-report
```

---