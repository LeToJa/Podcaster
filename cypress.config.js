import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    "defaultCommandTimeout": 100000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: [
      "cypress/e2e/navigation.cy.js",
      "cypress/e2e/home.cy.js",
      "cypress/e2e/podcast.cy.js",
      "cypress/e2e/episode.cy.js",
    ]
  },
});
