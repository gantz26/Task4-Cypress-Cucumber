const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  projectId: 'r3abdk',
  chromeWebSecurity: false,
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({
        plugins: [ createEsbuildPlugin(config) ],
      }))

      return config;
    },
    viewportWidth: 1080,
    viewportHeight: 720,
    supportFile: false,
    baseUrl: "https://www.saucedemo.com",
  },
});
