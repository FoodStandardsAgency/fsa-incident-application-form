/**
 * This is not a particularly good BDD test. It is to ensure the wording used around countries that the UK officially
 * recognises is legally sound. This unfortunately means these tests are very brittle.
 */

const SIMS_LOOKUP_DATA = require("../fixtures/sample-dropdown-data.json");
const YOUR_DETAILS = Cypress.config("contactDetails");

const {
  optionalFields: productOptionalFields,
} = require("./../support/optional-fields/add-product");

const options = { force: true };

context(
  "As an incidents officer, I want to ensure the wording around countries that the UK officially recognises is legally sound.",
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
        cy.visit(YOUR_DETAILS);
      });

      describe(`${YOUR_DETAILS}`, () => {
        it('should display "Location" as the label for the "address.country" dropdown', () => {
          cy.get('[data-cy="label.address.country"]')
            .should("contain", "Location")
            .should("not.contain", "Country");
        });

        it("should not contain any reference to the FCO country list", () => {
          cy.get("body").should(
            "not.contain",
            "All countries on the FCO country list"
          );
        });
      });

      describe("product > company page retains expected wording", () => {
        it("should have the expected wording", () => {
          cy.fillInContactDetails({
            fieldsToSkip: [
              "position",
              "organisation",
              "email",
              "address.line1",
              "address.line2",
              "address.county",
              "address.postcode",
            ],
          });

          cy.get('[data-cy="submit"]').click(options);

          cy.fillInDetailsOfIncident({
            fieldsToSkip: [
              "action-taken",
              "distribution-details",
              "illness-details",
              "local-authority-notified",
              "additional-information",
            ],
          });
          cy.get('[data-cy="submit"]').click(options);

          cy.get('[data-cy="add-product"]').click(options);

          cy.get('[data-cy="origin-country"]')
            .should("not.contain", "Please choose")
            .should("not.contain", "Please choose a country");

          cy.fillInProduct({
            fieldsToSkip: productOptionalFields,
          });

          cy.get('[data-cy="add-company"]').click(options);

          cy.get('[data-cy="label.address.country"]')
            .should("contain", "Country")
            .should("not.contain", "Location");

          cy.get('[data-cy="address.country"]')
            .should("not.contain", "Please choose")
            .should("not.contain", "Please choose a country");

          cy.get('[data-cy="address.country"]')
            .find("option:selected")
            .should("have.text", "United Kingdom");
        });
      });
    });

    describe("CY", () => {
      beforeEach(() => {
        cy.visit(`/cy/${YOUR_DETAILS}`);
      });

      describe(`/cy/${YOUR_DETAILS}`, () => {
        it('should display "Lleoliad" as the label for the "address.country" dropdown', () => {
          cy.get('[data-cy="label.address.country"]')
            .should("contain", "Lleoliad")
            .should("not.contain", "Gwlad");
        });

        it("should not contain any reference to the FCO country list", () => {
          cy.get("body").should(
            "not.contain",
            "Pob gwlad ar restr o wledydd FCO"
          );
        });
      });

      describe("product > company page retains expected wording", () => {
        it("should have the expected wording", () => {
          cy.fillInContactDetails({
            fieldsToSkip: [
              "position",
              "organisation",
              "email",
              "address.line1",
              "address.line2",
              "address.county",
              "address.postcode",
            ],
          });

          cy.get('[data-cy="submit"]').click(options);

          cy.fillInDetailsOfIncident({
            fieldsToSkip: [
              "action-taken",
              "distribution-details",
              "illness-details",
              "local-authority-notified",
              "additional-information",
            ],
          });
          cy.get('[data-cy="submit"]').click(options);

          cy.get('[data-cy="add-product"]').click(options);

          cy.get('[data-cy="origin-country"]')
            .should("not.contain", "Dewiswch wlad os gwelwch yn dda")
            .should("not.contain", "Please choose");

          cy.fillInProduct({
            fieldsToSkip: productOptionalFields,
          });

          cy.get('[data-cy="add-company"]').click(options);

          cy.get('[data-cy="label.address.country"]')
            .should("contain", "Gwlad")
            .should("not.contain", "Location")
            .should("not.contain", "Lleoliad");

          cy.get('[data-cy="address.country"]')
            .should("not.contain", "Dewiswch wlad os gwelwch yn dda")
            .should("not.contain", "Please choose");

          cy.get('[data-cy="address.country"]')
            .find("option:selected")
            .should("have.text", "United Kingdom");
        });
      });
    });
  }
);
