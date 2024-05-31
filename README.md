# Running Tests with Cypress

This repository contains tests written using Cypress for testing our application.

## Prerequisites

Before running the tests, ensure you have the following installed:

- Node.js: [Download & Install Node.js](https://nodejs.org/)
- npm (Node Package Manager): This comes bundled with Node.js installation.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/AISolutionsMaster/myercomau.git
   ```

2. Navigate to the project directory:

   ```bash
   cd repository
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Running Tests

1. Smoke Test

   ```bash
   npm run cy:smoke
   ```

   It will run with `--browser chrome -e TAGS='@smoke and not @development and not @noprod'`.

2. Regression Tests

   ```bash
   npm run cy:regression
   ```

   It will run with `--browser chrome -e TAGS='@regression and not @development'`.

3. Dev

   ```bash
   npm run cy:dev
   ```

   It will run with `--browser chrome -e TAGS='@dev'`.

## Feedback

If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

Happy testing!
