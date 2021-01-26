const SIMS_LOOKUP_DATA = require("../fixtures/sample-dropdown-data.json");
const YOUR_DETAILS = Cypress.config("contactDetails");
const DETAILS_OF_INCIDENT = Cypress.config("detailsOfIncident");
const DETAILS_OF_PRODUCT = Cypress.config("detailsOfProduct");

const options = { force: true };

context(
  "As an incidents officer, I want to know what the incident is, so that I can effectively investigate and act.",
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
        cy.visit(DETAILS_OF_INCIDENT);
      });

      it("should have a back button", () => {
        cy.get("[data-cy=back]").should("contain", "Previous");
      });

      it(`should be valid when all data is provided`, () => {
        cy.fillInDetailsOfIncident();

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]').should("not.exist");

        cy.url().should("contain", `/${DETAILS_OF_PRODUCT}`);
      });

      it(`should require the nature of the problem`, () => {
        cy.fillInDetailsOfIncident({
          fieldsToSkip: ["nature-of-problem"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "The field is required");

        cy.get('[data-cy="nature-of-problem-errors"]').should("exist");
      });

      it(`should allow navigating to the previous page, without triggering validation, if all form fields are empty`, () => {
        cy.get('[data-cy="back"]').click(options);

        cy.get('[data-cy="error-summary"]').should("not.exist");

        cy.url().should("contain", `/${YOUR_DETAILS}`);
      });

      it(`should enforce validation rules when navigating to the previous page if any field has data`, () => {
        cy.fillInDetailsOfIncident({
          fieldsToSkip: [
            "nature-of-problem",
            "action-taken",
            "distribution-details",
            "illness-details",
            "local-authority-notified",
          ],
        });

        cy.get('[data-cy="back"]').click(options);

        cy.get('[data-cy="error-summary"]').should("exist");

        cy.url().should("contain", `/${DETAILS_OF_INCIDENT}`);
      });

      it(`should not allow navigating to the next page if all form fields are empty`, () => {
        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]').should("exist");

        cy.url().should("not.contain", `/${YOUR_DETAILS}`);
      });
    });

    describe("CY", () => {
      beforeEach(() => {
        cy.visit(`/cy/${DETAILS_OF_INCIDENT}`);
      });

      it("should have a back button", () => {
        cy.get("[data-cy=back]").should("contain", "Blaenorol");
      });

      it(`should be valid when all data is provided`, () => {
        cy.fillInDetailsOfIncident();

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]').should("not.exist");

        cy.url().should("contain", `/cy/${DETAILS_OF_PRODUCT}`);
      });

      it(`should require the nature of the problem`, () => {
        cy.fillInDetailsOfIncident({
          fieldsToSkip: ["nature-of-problem"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Mae angen y cae");

        cy.get('[data-cy="nature-of-problem-errors"]').should("exist");
      });

      it(`should allow navigating to the previous page, without triggering validation, if all form fields are empty`, () => {
        cy.get('[data-cy="back"]').click(options);

        cy.get('[data-cy="error-summary"]').should("not.exist");

        cy.url().should("contain", `/cy/${YOUR_DETAILS}`);
      });

      it(`should enforce validation rules when navigating to the previous page if any field has data`, () => {
        cy.fillInDetailsOfIncident({
          fieldsToSkip: [
            "nature-of-problem",
            "action-taken",
            "distribution-details",
            "illness-details",
            "local-authority-notified",
          ],
        });

        cy.get('[data-cy="back"]').click(options);

        cy.get('[data-cy="error-summary"]').should("exist");

        cy.url().should("contain", `/cy/${DETAILS_OF_INCIDENT}`);
      });

      it(`should not allow navigating to the next page if all form fields are empty`, () => {
        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]').should("exist");

        cy.url().should("not.contain", `/cy/${YOUR_DETAILS}`);
      });
    });
  }
);
