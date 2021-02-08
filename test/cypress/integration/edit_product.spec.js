const SIMS_LOOKUP_DATA = require("../fixtures/sample-dropdown-data.json");

const {
  optionalFields: companyOptionalFields,
} = require("./../support/optional-fields/add-company");
const {
  optionalFields: productOptionalFields,
} = require("../support/optional-fields/add-product");

const translations = require("../../../incident-application-form/translations/form-fields.json");

const ADD_PRODUCT = Cypress.config("product");
const DETAILS_OF_PRODUCT = Cypress.config("detailsOfProduct");

const options = { force: true };

context(
  "As an incidents officer, I want to know about the products affected, so I can effectively investigate and act.",
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

    [
      {
        languageCode: "en",
        addProductPath: `/${ADD_PRODUCT}`,
        detailsOfProductPath: `/${DETAILS_OF_PRODUCT}`,
      },
      {
        languageCode: "cy",
        addProductPath: `/cy/${ADD_PRODUCT}`,
        detailsOfProductPath: `/cy/${DETAILS_OF_PRODUCT}`,
      },
    ].forEach(({ languageCode, addProductPath, detailsOfProductPath }) => {
      describe(languageCode.toUpperCase(), () => {
        beforeEach(() => {
          cy.visit(addProductPath);
          cy.fillInProduct({
            fieldsToSkip: productOptionalFields,
          });
          cy.get('[data-cy="add-company"]').click(options);
          cy.fillInCompany({
            fieldsToSkip: companyOptionalFields,
          });
          cy.get('[data-cy="submit"]').click(options);
        });

        it(`should have button to edit a product`, () => {
          cy.visit(detailsOfProductPath);

          cy.get('[data-cy="edit-product-0"]').should(
            "contain",
            translations.buttons.change[languageCode]
          );
        });

        describe("no changes made", () => {
          it("should allow clicking previous", () => {
            cy.get('[data-cy="back"]').click(options);
            cy.get('[data-cy="error-summary"]').should("not.exist");
          });

          it("should allow clicking save and continue", () => {
            cy.get('[data-cy="submit"]').click(options);
            cy.get('[data-cy="error-summary"]').should("not.exist");
          });

          it('should allow clicking "add company"', () => {
            cy.get('[data-cy="add-company"]').click(options);
            cy.get('[data-cy="error-summary"]').should("not.exist");
          });
        });

        describe("with invalid changes", () => {
          beforeEach(() => {
            cy.get('[data-cy="product-name"]').clear();
          });

          it("should validate changes on clicking previous", () => {
            cy.get('[data-cy="back"]').click(options);
            cy.get('[data-cy="error-summary"]').should("exist");
          });

          it('should validate changes on clicking "save and continue"', () => {
            cy.get('[data-cy="submit"]').click(options);
            cy.get('[data-cy="error-summary"]').should("exist");
          });

          it('should validate changes on clicking "add company"', () => {
            cy.get('[data-cy="add-company"]').click(options);
            cy.get('[data-cy="error-summary"]').should("exist");
          });
        });

        describe("with valid changes", () => {
          const oldProductName = "An example product name";
          const newProductName = "some new value";

          beforeEach(() => {
            cy.get('[data-cy="product-name"]').clear();
            cy.get('[data-cy="product-name"]').type(newProductName, options);
          });

          it("should save changes on clicking previous", () => {
            cy.get('[data-cy="back"]').click(options);
            cy.get('[data-cy="error-summary"]').should("not.exist");

            const productTitle = cy.get('[data-cy="product-name-0"]');
            productTitle.should("contain", newProductName);
            productTitle.should("not.contain", oldProductName);
          });

          it('should save changes on clicking "save and continue"', () => {
            cy.get('[data-cy="submit"]').click(options);
            cy.get('[data-cy="error-summary"]').should("not.exist");

            // on the summary page
            const productTitle = cy.get('[data-cy="product-name-1"]');
            productTitle.should("contain", newProductName);
            productTitle.should("not.contain", oldProductName);
          });

          it('should save changes on clicking "add company"', () => {
            cy.get('[data-cy="add-company"]').click(options);
            cy.get('[data-cy="company-type"]').select("Wholesaler", options);

            // return from the "add company" form with no changes
            cy.get('[data-cy="back"]').click(options);

            const productTitle = cy.get('[data-cy="product-name"]');
            productTitle.should("have.value", newProductName);
            productTitle.should("not.have.value", oldProductName);
          });
        });
      });
    });
  }
);
