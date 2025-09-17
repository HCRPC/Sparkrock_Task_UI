# Playwright Test Automation Framework

A comprehensive test automation framework for the Playwright website (https://playwright.dev/) built using Playwright with JavaScript and the Page Object Model (POM) design pattern.


## 🎯 Overview

This framework is designed to test critical functionalities of the Playwright website, ensuring reliability, maintainability, and scalability. It follows industry best practices and implements the Page Object Model design pattern for better code organization and reusability.

### Key Features

- **Page Object Model (POM)** design pattern implementation
- **Cross-browser testing** (Chromium, Firefox)
- **Comprehensive reporting** with HTML, JSON, and JUnit formats
- **Screenshot and video capture** on test failures
- **Parallel test execution** for faster results

## 🏗️ Framework Architecture

```
playwright-automation-framework/
├── pages/
│   ├── BasePage.js             # Base page with common functionality
│   ├── HomePage.js             # Home page object model
├── tests/
│   ├── search-functionality.spec.js           # Search functionality tests
│   └── get-started-button-functionality.spec.js # Get Started button tests
├── reports/
│   ├── html-report/            # HTML test reports
│   ├── screenshots/            # Test screenshots
│   └── videos/                 # Test execution videos
├── playwright.config.js        # Playwright configuration
├── package.json               # Project dependencies and scripts
└── README.md                  # This file
```

## 🚀 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Sparkrock_Task_UI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install:browsers
   ```

4. **Install system dependencies (Linux/macOS)**
   ```bash
   npm run install:deps
   ```

## 🎮 Usage

### Running Tests

#### Run all tests
```bash
npm test
```

#### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

#### Run tests in debug mode
```bash
npm run test:debug
```

#### Run tests with UI mode
```bash
npm run test:ui
```

#### Run tests on specific browser
```bash
npm run test:chromium
npm run test:firefox
```

### Viewing Reports

#### Open HTML report
```bash
npm run report
```

Reports are automatically generated in the `reports/` directory after test execution.


**Built by Haci Arpaci**

