# DevPulse Demo

[![npm version](https://img.shields.io/npm/v/kriti-devpulse.svg)](https://www.npmjs.com/package/kriti-devpulse)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An official demonstration repository showcasing the capabilities, diagnostics, and scoring system of [`kriti-devpulse`](https://www.npmjs.com/package/kriti-devpulse) — a smart Node.js project health auditor.

---

## Table of Contents

- [Overview](#overview)
- [What is DevPulse?](#what-is-devpulse)
- [Architecture & Verification Categories](#architecture--verification-categories)
- [Demonstrated Sample Projects](#demonstrated-sample-projects)
- [Health Score Comparison](#health-score-comparison)
- [Technologies Used](#technologies-used)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Demonstrations](#running-demonstrations)
  - [Automated All-in-One Runner](#automated-all-in-one-runner)
  - [Individual Project Audits](#individual-project-audits)
  - [Exporting JSON Reports](#exporting-json-reports)
- [Terminal Output Samples](#terminal-output-samples)
- [Visual Demonstrations](#visual-demonstrations)
- [Contributing](#contributing)
- [Links & References](#links--references)
- [License](#license)

---

## Overview

Modern Node.js applications frequently accumulate technical debt: loose version specifiers, unmaintained packages, missing configuration manifests, absent documentation, and bloated build artifacts. 

**DevPulse Demo** provides three realistic, self-contained Node.js projects that demonstrate how `kriti-devpulse` audits codebases across six distinct dimensions, generating actionable diagnostic reports and composite scores (0–100).

---

## What is DevPulse?

`kriti-devpulse` is a zero-configuration command-line auditor for Node.js projects. It inspects configuration files, dependency graphs, package manifests, and project structure to compute an objective health score.

### Key Capabilities

- **Manifest Inspection:** Validates critical metadata fields (`name`, `version`, `engines`, `license`, `main`/`bin`).
- **File Hygiene:** Scans for required repository documents (`README.md`, `.gitignore`, `LICENSE`) and developer tooling configs (`.eslintrc`, `.prettierrc`, `jest.config.js`).
- **Dependency Diagnostics:** Identifies hazardous version specifiers (`*`, `latest`), duplicate entries between dependencies and devDependencies, deprecated packages, and unused imports.
- **Script Validation:** Flags missing lifecycle scripts (`start`, `test`, `build`) and hazardous shell commands (e.g., `rm -rf /`, `curl | bash`).
- **Asset Size Auditing:** Detects oversized source files that may degrade installation speed and bundle efficiency.

---

## Architecture & Verification Categories

DevPulse evaluates projects against a 100-point composite model divided into six categories:

| Category | Maximum Points | Verification Scope |
| :--- | :---: | :--- |
| **Package Metadata** | 20 pts | Verifies required fields (`name`, `version`), recommended metadata (`description`, `author`, `license`, `repository`), and runtime specifications (`engines`). |
| **Missing Files** | 20 pts | Audits documentation (`README.md`, `LICENSE`, `CHANGELOG.md`), VCS configs (`.gitignore`, `.npmignore`), and tooling configurations (`.eslintrc`, `.prettierrc`, `jest.config.js`). |
| **Dependency Health** | 25 pts | Checks for pinned/bounded version specifiers, known deprecated packages, duplicate package declarations, and unreferenced production dependencies. |
| **npm Scripts** | 15 pts | Checks for standard lifecycle commands (`start`, `test`, `build`, `lint`) and screens for dangerous shell patterns. |
| **File Hygiene** | 10 pts | Analyzes source tree for individual files exceeding standard size thresholds (>100 KB warning, >500 KB large). |
| **Bonus Criteria** | 10 pts | Rewards explicit engines declarations, non-proprietary licensing, TypeScript type definitions, linting scripts, and prepare hooks. |

---

## Demonstrated Sample Projects

This repository includes three dedicated sample projects under `demo-projects/`:

### 1. Healthy Project (`demo-projects/healthy-project`)
- **Profile:** Fully compliant production-grade microservice.
- **Configuration:** Complete metadata, explicit Node engine constraints (`>=18.0.0`), TypeScript declarations (`types`), full documentation (`README.md`, `LICENSE`, `CHANGELOG.md`, `CONTRIBUTING.md`), standard tooling configs (`.eslintrc.json`, `.prettierrc`, `jest.config.js`), and tested dependencies (`express`, `chalk`).
- **DevPulse Score:** **100/100 (Grade A, Excellent)**

### 2. Warning Project (`demo-projects/warning-project`)
- **Profile:** An active project carrying manageable technical debt.
- **Issues Introduced:**
  - Duplicate dependency: `lodash` listed in both `dependencies` and `devDependencies`.
  - Unused dependency: `axios` declared in `package.json` but unreferenced in source code.
  - Missing tooling files: absent `.prettierrc`, `jest.config.js`, `.editorconfig`, and `CHANGELOG.md`.
  - Missing metadata: omitted `engines`, `repository`, and `keywords`.
  - Large dataset: `src/data/metrics-cache.json` (>100 KB) triggering file size notice.
- **DevPulse Score:** **74/100 (Grade C, Fair)**

### 3. Unhealthy Project (`demo-projects/unhealthy-project`)
- **Profile:** A legacy repository exhibiting severe security, configuration, and structural flaws.
- **Issues Introduced:**
  - Insecure dependency specifier: `"express": "*"` (wildcard allows arbitrary breaking versions).
  - Deprecated package: `"request": "^2.88.2"` (flagged as deprecated).
  - High-risk scripts: `"clean": "rm -rf /tmp/cache && curl -s http://insecure.local/install.sh | bash"`.
  - Missing critical files: no `README.md`, no `LICENSE`, no `.gitignore`, no linter configuration.
  - Unused dependencies: unreferenced `moment` and `request`.
  - Large bundle: unminified `src/legacy-bundle.js` (>500 KB).
  - Missing standard scripts: no `test` or `start` scripts.
- **DevPulse Score:** **30/100 (Grade F, Critical)**

---

## Health Score Comparison

The table below reflects genuine audit scores produced by `kriti-devpulse@1.0.0`:

| Metric / Dimension | Healthy Project | Warning Project | Unhealthy Project |
| :--- | :---: | :---: | :---: |
| **Overall Health Score** | **100 / 100** | **74 / 100** | **30 / 100** |
| **Grade & Status** | **A (Excellent)** | **C (Fair)** | **F (Critical)** |
| **Package Metadata** | 20 / 20 | 15 / 20 | 8 / 20 |
| **Missing Files** | 20 / 20 | 14 / 20 | 4 / 20 |
| **Dependency Health** | 25 / 25 | 19 / 25 | 9 / 25 |
| **npm Scripts** | 15 / 15 | 15 / 15 | 0 / 15 |
| **File Hygiene** | 10 / 10 | 9 / 10 | 7 / 10 |
| **Bonus Points** | 10 / 10 | 2 / 10 | 2 / 10 |
| **Critical Issues** | 0 | 0 | 3 (Wildcard version, dangerous scripts) |
| **Warnings** | 0 | 1 (Duplicate dependency) | 5 (Missing docs, deprecated package) |
| **Unused Dependencies** | 0 | 1 (`axios`) | 2 (`request`, `moment`) |
| **Exit Code** | 0 | 0 | 0 |

---

## Technologies Used

- **Node.js** (v16.0.0 or higher required, tested on v24.x)
- **kriti-devpulse** (v1.0.0 from npm)
- **Commander.js, Chalk, Boxen** (via DevPulse CLI runtime)
- **Vanilla Node.js Automation Scripts** (zero additional wrapper overhead)

---

## Repository Structure

```
DevPulse-Demo/
│
├── README.md                      # Comprehensive project documentation
├── package.json                   # Root orchestrator and npm script definitions
├── package-lock.json              # Pinned root dependencies
├── .gitignore                     # Repository ignore rules
├── LICENSE                        # Project MIT license
│
├── demo-projects/
│   ├── healthy-project/           # Sample 1: Score 100 (Grade A)
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── LICENSE
│   │   ├── CHANGELOG.md
│   │   ├── CONTRIBUTING.md
│   │   ├── .editorconfig
│   │   ├── .eslintrc.json
│   │   ├── .prettierrc
│   │   ├── jest.config.js
│   │   ├── src/
│   │   │   ├── index.js
│   │   │   └── index.d.ts
│   │   └── tests/
│   │       └── index.test.js
│   │
│   ├── warning-project/           # Sample 2: Score 74 (Grade C)
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── LICENSE
│   │   ├── .gitignore
│   │   ├── .eslintrc.json
│   │   └── src/
│   │       ├── app.js
│   │       └── data/
│   │           └── metrics-cache.json (>100 KB)
│   │
│   └── unhealthy-project/         # Sample 3: Score 30 (Grade F)
│       ├── package.json
│       └── src/
│           ├── index.js
│           └── legacy-bundle.js   (>500 KB)
│
├── scripts/
│   ├── setup-demo.js              # Environment prerequisites validator
│   └── run-all-demos.js           # Automated test suite runner
│
├── reports/
│   ├── .gitkeep
│   ├── healthy-project-report.json
│   ├── warning-project-report.json
│   └── unhealthy-project-report.json
│
└── screenshots/
    ├── .gitkeep
    ├── healthy-audit.txt          # Raw text terminal output for healthy scan
    ├── warning-audit.txt          # Raw text terminal output for warning scan
    ├── unhealthy-audit.txt        # Raw text terminal output for unhealthy scan
    └── all-demos-run.txt          # Complete multi-project scan terminal capture
```

---

## Prerequisites

- **Node.js**: `>= 16.0.0` (check using `node -v`)
- **npm**: `>= 7.0.0` (check using `npm -v`)

---

## Installation

Clone the repository and install root dependencies:

```bash
git clone https://github.com/kriticypher/DevPulse-Demo.git
cd DevPulse-Demo
npm install
```

Verify your environment setup:

```bash
npm run setup
```

---

## Running Demonstrations

### Automated All-in-One Runner

To execute all three project audits sequentially with progress output and summary comparison:

```bash
npm run demo:all
```

### Individual Project Audits

Audit individual sample projects directly:

```bash
# 1. Audit the pristine healthy project
npm run demo:healthy

# 2. Audit the project with technical debt and warnings
npm run demo:warning

# 3. Audit the high-risk, legacy project
npm run demo:unhealthy
```

You can also run the CLI with specific flags:

```bash
# Quick score check only
npx kriti-devpulse score ./demo-projects/healthy-project

# Project package metadata summary
npx kriti-devpulse info ./demo-projects/healthy-project

# Enforce a CI failure threshold
npx kriti-devpulse audit ./demo-projects/unhealthy-project --threshold 70
```

### Exporting JSON Reports

DevPulse supports structured JSON exports for CI/CD reporting:

```bash
# Export report for healthy project
npm run report:healthy

# Export report for warning project
npm run report:warning

# Export report for unhealthy project
npm run report:unhealthy

# Export reports for all three projects at once
npm run report:all
```

Generated reports are persisted in the `reports/` folder.

---

## Terminal Output Samples

### Healthy Project Audit
```
╔═══════════════════════════════════════════════════════╗
║   Health Score                                        ║
║     A  100/100  Excellent                             ║
║     metadata       ████████████████████ 20/20  100%   ║
║     files          ████████████████████ 20/20  100%   ║
║     dependencies   ████████████████████ 25/25  100%   ║
║     scripts        ████████████████████ 15/15  100%   ║
║     fileHygiene    ████████████████████ 10/10  100%   ║
║     bonus          ████████████████████ 10/10  100%   ║
╚═══════════════════════════════════════════════════════╝
```

### Warning Project Audit
```
╔═══════════════════════════════════════════════════════╗
║   Health Score                                        ║
║     C  74/100  Fair                                   ║
║     metadata       ███████████████░░░░░ 15/20  75%    ║
║     files          ██████████████░░░░░░ 14/20  70%    ║
║     dependencies   ███████████████░░░░░ 19/25  76%    ║
║     scripts        ████████████████████ 15/15  100%   ║
║     fileHygiene    ██████████████████░░ 9/10   90%    ║
║     bonus          ████░░░░░░░░░░░░░░░░ 2/10   20%    ║
╚═══════════════════════════════════════════════════════╝
```

### Unhealthy Project Audit
```
╔═════════════════════════════════════════════════════╗
║   Health Score                                      ║
║     F  30/100  Critical                             ║
║     metadata       ████████░░░░░░░░░░░░ 8/20  40%   ║
║     files          ████░░░░░░░░░░░░░░░░ 4/20  20%   ║
║     dependencies   ███████░░░░░░░░░░░░░ 9/25  36%   ║
║     scripts        ░░░░░░░░░░░░░░░░░░░░ 0/15  0%    ║
║     fileHygiene    ██████████████░░░░░░ 7/10  70%   ║
║     bonus          ████░░░░░░░░░░░░░░░░ 2/10  20%   ║
╚═════════════════════════════════════════════════════╝
```

---

## Visual Demonstrations

Full terminal session logs are saved under the `screenshots/` directory:
- [Healthy Audit Log](screenshots/healthy-audit.txt)
- [Warning Audit Log](screenshots/warning-audit.txt)
- [Unhealthy Audit Log](screenshots/unhealthy-audit.txt)
- [Combined Demo Runner Log](screenshots/all-demos-run.txt)

---

## Contributing

Contributions, feedback, and issue reports are welcome.
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/improvement`.
3. Verify all demos pass: `npm run demo:all`.
4. Commit your changes: `git commit -m 'feat: add feature'`.
5. Push to the branch and open a Pull Request.

---

## Links & References

- **npm Package:** [kriti-devpulse on npm](https://www.npmjs.com/package/kriti-devpulse)
- **Demo Repository:** [DevPulse-Demo on GitHub](https://github.com/kriticypher/DevPulse-Demo)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
