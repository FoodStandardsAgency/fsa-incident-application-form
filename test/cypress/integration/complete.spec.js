const SIMS_LOOKUP_DATA = require('../fixtures/sample-dropdown-data.json');
const COMPLETE = Cypress.config("complete");

const options = { force: true };

context(
  "As a service user, I want to see a summary of my report, so that I can check it’s accurate.",
  () => {
    beforeEach(() => {
      // catches, logs and ignores any load-errors on the page..
      // can probably delete this but worth including in 1st template in case we need it..
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err.stack);
        return false;
      });

      cy.setupSimsLookups(SIMS_LOOKUP_DATA);
    });

    describe("EN", () => {
      it(`Visit ${COMPLETE} directly with an invalid session should redirect EN home`, () => {
        cy.visit(COMPLETE);

        cy.get('[data-cy="reference-number"]').should(
          "not.contain",
          `reference number`
        );

        cy.get("[data-cy=start-button]").should("contain", "Start");
      });
    });

    describe("CY", () => {
      it(`Visit /cy/${COMPLETE} directly with an invalid session should redirect EN home - because session var is lost`, () => {
        cy.visit(`/cy/${COMPLETE}`);

        cy.get('[data-cy="reference-number"]').should(
          "not.contain",
          `reference number`
        );

        cy.get("[data-cy=start-button]").should("not.contain", "Dechrau");
        cy.get("[data-cy=start-button]").should("contain", "Start");
      });
    });
  }
);
