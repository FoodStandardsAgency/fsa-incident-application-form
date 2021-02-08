const SIMS_LOOKUP_DATA = require("../fixtures/sample-dropdown-data.json");
const {
  optionalFields: companyOptionalFields,
} = require("./../support/optional-fields/add-company");
const {
  optionalFields: productOptionalFields,
} = require("../support/optional-fields/add-product");

const ADD_PRODUCT = Cypress.config("product");

const options = { force: true };

context(
  "As an incidents officer, I want to know which companies are associated with the affected products, so I can effectively investigate and act.",
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
        cy.visit(ADD_PRODUCT);
        cy.fillInProduct({
          fieldsToSkip: productOptionalFields,
        });
        cy.get('[data-cy="add-company"]').click(options);
      });

      it("should have a back button", () => {
        cy.get("[data-cy=back]").should("contain", "Previous");
      });

      it("should have a save and continue button", () => {
        cy.get("[data-cy=submit]").should("contain", "Save and Continue");
      });

      it("should be valid with the minimal amount of data", () => {
        cy.fillInCompany({
          fieldsToSkip: companyOptionalFields,
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]').should("not.exist");
      });

      it(`should require the company type`, () => {
        cy.fillInCompany({
          fieldsToSkip: ["company-type"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Company type is required");
      });

      it(`should allow navigating to the previous page, without triggering validation, if all form fields are empty`, () => {
        cy.get('[data-cy="back"]').click(options);

        cy.get('[data-cy="error-summary"]').should("not.exist");

        cy.url().should("contain", `/${ADD_PRODUCT}`);
      });

      it(`should enforce validation rules when navigating to the previous page if any field has data`, () => {
        cy.fillInCompany({
          fieldsToSkip: ["company-type"],
        });

        cy.get('[data-cy="back"]').click(options);

        cy.get('[data-cy="error-summary"]').should("exist");
      });

      it(`should not allow navigating to the next page if all form fields are empty`, () => {
        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]').should("exist");
      });
    });

    describe("CY", () => {
      beforeEach(() => {
        cy.visit(`/cy/${ADD_PRODUCT}`);
        cy.fillInProduct({
          fieldsToSkip: productOptionalFields,
        });
        cy.get('[data-cy="add-company"]').click(options);
      });

      it("should have a back button", () => {
        cy.get("[data-cy=back]").should("contain", "Blaenorol");
      });

      it("should have a save and continue button", () => {
        cy.get("[data-cy=submit]").should("contain", "Arbed a Nesaf");
      });

      it(`should require the company type`, () => {
        cy.fillInCompany({
          fieldsToSkip: ["company-type"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Mae angen math o gwmni");
      });

      it(`should allow navigating to the previous page, without triggering validation, if all form fields are empty`, () => {
        cy.get('[data-cy="back"]').click(options);

        cy.get('[data-cy="error-summary"]').should("not.exist");

        cy.url().should("contain", `/cy/${ADD_PRODUCT}`);
      });

      it(`should enforce validation rules when navigating to the previous page if any field has data`, () => {
        cy.fillInCompany({
          fieldsToSkip: ["company-type"],
        });

        cy.get('[data-cy="back"]').click(options);

        cy.get('[data-cy="error-summary"]').should("exist");
      });

      it(`should not allow navigating to the next page if all form fields are empty`, () => {
        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]').should("exist");
      });
    });
  }
);
