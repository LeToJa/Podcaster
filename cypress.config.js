import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    "defaultCommandTimeout": 100000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: [
      "cypress/e2e/navigation.cy.ts",
      "cypress/e2e/home.cy.ts",
      "cypress/e2e/podcast.cy.ts",
      "cypress/e2e/episode.cy.ts",
    ]
  },
});
