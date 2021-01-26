const SIMS_LOOKUP_DATA = require("../fixtures/sample-dropdown-data.json");
const {
  optionalFields: companyOptionalFields,
} = require("./../support/optional-fields/add-company");
const {
  optionalFields: productOptionalFields,
} = require("../support/optional-fields/add-product");

const translations = require("../../../incident-application-form/translations/form-fields.json");

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

    [
      {
        languageCode: "en",
        addProductPath: `/${ADD_PRODUCT}`,
      },
      {
        languageCode: "cy",
        addProductPath: `/cy/${ADD_PRODUCT}`,
      },
    ].forEach(({ languageCode, addProductPath }) => {
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

        it(`should have button to edit a company`, () => {
          cy.get('[data-cy="edit-company-0"]').should(
            "contain",
            translations.buttons.change[languageCode]
          );
        });

        describe("no changes made", () => {
          beforeEach(() => {
            cy.get('[data-cy="edit-company-0"]').click(options);
          });

          it("should allow clicking previous", () => {
            cy.get('[data-cy="back"]').click(options);
            cy.get('[data-cy="error-summary"]').should("not.exist");
          });

          it("should allow clicking save and continue", () => {
            cy.get('[data-cy="submit"]').click(options);
            cy.get('[data-cy="error-summary"]').should("not.exist");
          });
        });

        describe("with invalid changes", () => {
          beforeEach(() => {
            cy.get('[data-cy="edit-company-0"]').click(options);
            cy.get('[data-cy="address.postcode"]').type(
              "3".repeat(100),
              options
            );
          });

          it("should validate changes on clicking previous", () => {
            cy.get('[data-cy="back"]').click(options);
            cy.get('[data-cy="error-summary"]').should("exist");
          });

          it('should validate changes on clicking "save and continue"', () => {
            cy.get('[data-cy="submit"]').click(options);
            cy.get('[data-cy="error-summary"]').should("exist");
          });
        });

        describe("with valid changes", () => {
          const oldCompanyType = "Farmer";
          const newCompanyType = "Wholesaler";

          beforeEach(() => {
            cy.get('[data-cy="edit-company-0"]').click(options);
            cy.get('[data-cy="company-type"]').select(newCompanyType, options);
          });

          afterEach(() => {
            // go to summary page to check answer
            cy.get('[data-cy="submit"]').click(options);

            const companyType = cy.get(
              '[data-cy="product-company-1-company-type"]'
            );
            companyType.should("contain", newCompanyType);
            companyType.should("not.contain", oldCompanyType);
          });

          it("should save changes on clicking previous", () => {
            cy.get('[data-cy="back"]').click(options);
            cy.get('[data-cy="error-summary"]').should("not.exist");
          });

          it('should save changes on clicking "save and continue"', () => {
            cy.get('[data-cy="submit"]').click(options);
            cy.get('[data-cy="error-summary"]').should("not.exist");
          });
        });
      });
    });
  }
);
