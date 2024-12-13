import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'src/cypress/e2e/**/*.cy.ts',
    supportFile: 'src/cypress/support/e2e.ts',
    fixturesFolder: 'src/cypress/fixtures',
  },
});
