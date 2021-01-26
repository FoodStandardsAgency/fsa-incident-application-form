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

        it(`should have button to remove a company`, () => {
          const removeCompanyButton = cy.get('[data-cy="remove-company-0"]');

          removeCompanyButton.should(
            "contain",
            translations.buttons.remove[languageCode]
          );

          removeCompanyButton.click(options);

          removeCompanyButton.should("not.exist");
        });
      });
    });
  }
);
