const {
  defaultFieldValues: contactDetails,
} = require("../support/commands/fill-in-contact-details");
const {
  defaultFieldValues: detailsOfIncident,
} = require("../support/commands/fill-in-details-of-incident");
const {
  defaultFieldValues: product,
} = require("../support/commands/fill-in-product");
const { optionalFields: companyOptionalFields } = require("./add_company.spec");
const { optionalFields: productOptionalFields } = require("./add_product.spec");

const YOUR_DETAILS = Cypress.config("contactDetails");
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
    });

    describe("EN", () => {
      it(`Visit ${YOUR_DETAILS}, fill in some valid data, submit, prove it exists on the preview`, () => {
        cy.visit(YOUR_DETAILS);

        cy.fillInContactDetails();
        cy.get('[data-cy="submit"]').click(options);

        cy.fillInDetailsOfIncident();
        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="add-product"]').click(options);
        cy.fillInProduct({
          fieldsToSkip: productOptionalFields,
        });

        cy.get('[data-cy="add-company"]').click(options);
        cy.fillInCompany({
          fieldsToSkip: companyOptionalFields,
        });
        cy.get('[data-cy="submit"]').click(options);

        // submit the now valid product page
        cy.get('[data-cy="submit"]').click(options);

        // submit the preview page
        cy.get('[data-cy="submit"]').click(options);

        cy.url().should("contain", `/${COMPLETE}`);

        cy.get('[data-cy="reference-number"]').should(
          "contain",
          `reference number`
        );
      });
    });

    describe("CY", () => {
      it.only(`Visit /cy/${YOUR_DETAILS}, fill in some valid data, submit, prove it exists on the preview`, () => {
        cy.visit(`/cy/${YOUR_DETAILS}`);

        cy.fillInContactDetails();
        cy.get('[data-cy="submit"]').click(options);

        cy.fillInDetailsOfIncident();
        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="add-product"]').click(options);
        cy.fillInProduct({
          fieldsToSkip: productOptionalFields,
        });

        cy.get('[data-cy="add-company"]').click(options);
        cy.fillInCompany({
          fieldsToSkip: companyOptionalFields,
        });
        cy.get('[data-cy="submit"]').click(options);

        // submit the now valid product page
        cy.get('[data-cy="submit"]').click(options);

        // submit the preview page
        cy.get('[data-cy="submit"]').click(options);

        cy.url().should("contain", `/cy/${COMPLETE}`);

        cy.get('[data-cy="reference-number"]').should(
          "contain",
          `Eich cyfeirnod`
        );
      });
    });
  }
);
