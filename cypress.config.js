const cucumber = require("cypress-cucumber-preprocessor").default;
const { defineConfig } = require("cypress");
const {
  initPlugin,
} = require("@frsource/cypress-plugin-visual-regression-diff/plugins");

module.exports = defineConfig({
  experimentalMemoryManagement: true,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportDir: "cypress/results",
    reportFilename: "[name].html",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
    overwrite: false,
    html: true,
    json: true,
    quite: false,
    debug: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      initPlugin(on, config);
      require("cypress-mochawesome-reporter/plugin")(on);

      on("file:preprocessor", cucumber());
      on("task", {
        log(message) {
          console.log("        " + message);
          return null;
        },
      });
      // implement node event listeners here
    },
    baseUrl: "https://www.myer.com.au",
    specPattern: "cypress/e2e/*.feature",
    defaultCommandTimeout: 60000,
    requestTimeout: 60000,
  },
});
