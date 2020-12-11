const SIMS_LOOKUP_DATA = require('../fixtures/sample-dropdown-data.json');
const DETAILS_OF_PRODUCT = Cypress.config("detailsOfProduct");

const options = { force: true };

context(
  "As an incidents officer, I want to know about products affected, so that I can effectively investigate and act.",
  () => {
    beforeEach(() => {
      cy.clearCookies();

      // catches, logs and ignores any load-errors on the page..
      // can probably delete this but worth including in 1st template in case we need it..
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err.stack);
        return false;
      });

      cy.setupSimsLookups(SIMS_LOOKUP_DATA);
    });

    describe("EN", () => {
      beforeEach(() => {
        cy.visit(DETAILS_OF_PRODUCT);
      });

      it("should have an add button", () => {
        cy.get("[data-cy=add-product]").should("contain", "Add");
      });

      it("should have a back button", () => {
        cy.get("[data-cy=back]").should("contain", "Previous");
      });

      it("should have a disabled save and continue button", () => {
        cy.get("[data-cy=submit]")
          .should("contain", "Save and Continue")
          .should("be.disabled");
      });
    });

    describe("CY", () => {
      beforeEach(() => {
        cy.visit(`/cy/${DETAILS_OF_PRODUCT}`);
      });

      it("should have an add button", () => {
        cy.get("[data-cy=add-product]").should("contain", "Ychwanegu");
      });

      it("should have a back button", () => {
        cy.get("[data-cy=back]").should("contain", "Blaenorol");
      });

      it("should have a disabled save and continue button", () => {
        cy.get("[data-cy=submit]")
          .should("contain", "Arbed a pharhau")
          .should("be.disabled");
      });
    });
  }
);
