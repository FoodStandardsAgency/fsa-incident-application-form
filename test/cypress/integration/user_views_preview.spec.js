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
const PREVIEW = Cypress.config("preview");
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

    describe("Invalid payload redirects back to Your Details", () => {
      describe("EN", () => {
        it("should redirect back to Your Details if posting an invalid or incomplete payload", () => {
          cy.visit(PREVIEW);

          cy.get('[data-cy="submit"]').click(options);

          cy.url().should("not.contain", `/${COMPLETE}`);

          cy.url().should("contain", `/${YOUR_DETAILS}`);
        });
      });

      describe("CY", () => {
        it("should redirect back to Your Details if posting an invalid or incomplete payload", () => {
          cy.visit(`/cy/${PREVIEW}`);

          cy.get('[data-cy="submit"]').click(options);

          cy.url().should("not.contain", `/cy/${COMPLETE}`);

          cy.url().should("contain", `/cy/${YOUR_DETAILS}`);
        });
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
        cy.fillInProduct();

        cy.get('[data-cy="add-company"]').click(options);
        cy.fillInCompany();
        cy.get('[data-cy="submit"]').click(options);

        // submit the now valid product page
        cy.get('[data-cy="submit"]').click(options);

        cy.url().should("contain", `/${PREVIEW}`);

        // buttons
        cy.get('[data-cy="page-heading"]').should("contain", "Summary");
        cy.get('[data-cy="back"]').should("contain", "Previous");
        cy.get('[data-cy="submit"]').should("contain", "Submit");

        // your details
        cy.get('[data-cy="notifier-type"]').should(
          "contain",
          contactDetails.notifierType
        );
        cy.get('[data-cy="contact-name"]').should(
          "contain",
          contactDetails.contactName
        );
        cy.get('[data-cy="position"]').should(
          "contain",
          contactDetails.position
        );
        cy.get('[data-cy="organisation"]').should(
          "contain",
          contactDetails.organisation
        );
        cy.get('[data-cy="email"]').should("contain", contactDetails.email);
        cy.get('[data-cy="address.line1"]').should(
          "contain",
          contactDetails.address.line1
        );
        cy.get('[data-cy="address.line2"]').should(
          "contain",
          contactDetails.address.line2
        );
        cy.get('[data-cy="address.town"]').should(
          "contain",
          contactDetails.address.town
        );
        cy.get('[data-cy="address.county"]').should(
          "contain",
          contactDetails.address.county
        );
        cy.get('[data-cy="address.postcode"]').should(
          "contain",
          contactDetails.address.postcode
        );
        cy.get('[data-cy="address.country"]').should(
          "contain",
          contactDetails.address.country
        );
        // end your details

        // details of incident
        cy.get('[data-cy="nature-of-problem"]').should(
          "contain",
          detailsOfIncident.natureOfProblem
        );
        cy.get('[data-cy="action-taken"]').should(
          "contain",
          detailsOfIncident.actionTaken
        );
        cy.get('[data-cy="distribution-details"]').should(
          "contain",
          detailsOfIncident.distributionDetails
        );
        cy.get('[data-cy="illness-details"]').should(
          "contain",
          detailsOfIncident.illnessDetails
        );
        cy.get('[data-cy="local-authority-notified"]').should(
          "contain",
          detailsOfIncident.localAuthorityNotified
        );
        cy.get('[data-cy="additional-information"]').should(
          "contain",
          detailsOfIncident.additionalInformation
        );
        // end details of incident

        // details of company
        cy.get('[data-cy="preview-product-heading-1"]').should("exist");

        cy.get('[data-cy="product-additional-information-1"]').should(
          "contain",
          product.additionalInformation
        );
        cy.get('[data-cy="product-amount-imported-distributed-1"]').should(
          "contain",
          product.amountImportedDistributed
        );
        product.batchCodes.split("\n").forEach((batchCode) => {
          cy.get('[data-cy="product-batch-codes-1"]').should(
            "contain",
            batchCode
          );
        });
        cy.get('[data-cy="product-best-before-1"]').should(
          "contain",
          "Wednesday, February 1st, 2023"
        );
        cy.get('[data-cy="product-brand-1"]').should("contain", product.brand);
        cy.get('[data-cy="product-display-until-1"]').should(
          "contain",
          `Saturday, April 3rd, 1999`
        );
        cy.get('[data-cy="product-origin-country-1"]').should(
          "contain",
          product.originCountry
        );
        cy.get('[data-cy="product-pack-size-1"]').should(
          "contain",
          product.packSize
        );
        cy.get('[data-cy="product-package-description-1"]').should(
          "contain",
          product.packageDescription
        );
        cy.get('[data-cy="product-name-1"]').should(
          "contain",
          product.productName
        );
        cy.get('[data-cy="product-type-1"]').should(
          "contain",
          product.productType
        );
        cy.get('[data-cy="product-units-1"]').should(
          "contain",
          product.unitType
        );
        cy.get('[data-cy="product-use-by-1"]').should(
          "contain",
          `Monday, December 11th, 2023`
        );
        cy.get('[data-cy="preview-company-heading-1"]').should("exist");
      });
    });

    describe("CY", () => {
      it(`Visit /cy/${YOUR_DETAILS}, fill in some valid data, submit, prove it exists on the preview`, () => {
        cy.visit(`/cy/${YOUR_DETAILS}`);

        cy.fillInContactDetails();
        cy.get('[data-cy="submit"]').click(options);

        cy.fillInDetailsOfIncident();
        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="add-product"]').click(options);
        cy.fillInProduct();

        cy.get('[data-cy="add-company"]').click(options);
        cy.fillInCompany();
        cy.get('[data-cy="submit"]').click(options);

        // submit the now valid product page
        cy.get('[data-cy="submit"]').click(options);

        cy.url().should("contain", `/${PREVIEW}`);

        // buttons
        cy.get('[data-cy="page-heading"]').should("contain", "Crynodeb");
        cy.get('[data-cy="back"]').should("contain", "Blaenorol");
        cy.get('[data-cy="submit"]').should("contain", "Cyflwyno");

        // your details
        cy.get('[data-cy="notifier-type"]').should(
          "contain",
          contactDetails.notifierType
        );
        cy.get('[data-cy="contact-name"]').should(
          "contain",
          contactDetails.contactName
        );
        cy.get('[data-cy="position"]').should(
          "contain",
          contactDetails.position
        );
        cy.get('[data-cy="organisation"]').should(
          "contain",
          contactDetails.organisation
        );
        cy.get('[data-cy="email"]').should("contain", contactDetails.email);
        cy.get('[data-cy="address.line1"]').should(
          "contain",
          contactDetails.address.line1
        );
        cy.get('[data-cy="address.line2"]').should(
          "contain",
          contactDetails.address.line2
        );
        cy.get('[data-cy="address.town"]').should(
          "contain",
          contactDetails.address.town
        );
        cy.get('[data-cy="address.county"]').should(
          "contain",
          contactDetails.address.county
        );
        cy.get('[data-cy="address.postcode"]').should(
          "contain",
          contactDetails.address.postcode
        );
        cy.get('[data-cy="address.country"]').should(
          "contain",
          contactDetails.address.country
        );
        // end your details

        // details of incident
        cy.get('[data-cy="nature-of-problem"]').should(
          "contain",
          detailsOfIncident.natureOfProblem
        );
        cy.get('[data-cy="action-taken"]').should(
          "contain",
          detailsOfIncident.actionTaken
        );
        cy.get('[data-cy="distribution-details"]').should(
          "contain",
          detailsOfIncident.distributionDetails
        );
        cy.get('[data-cy="illness-details"]').should(
          "contain",
          detailsOfIncident.illnessDetails
        );
        cy.get('[data-cy="local-authority-notified"]').should(
          "contain",
          detailsOfIncident.localAuthorityNotified
        );
        cy.get('[data-cy="additional-information"]').should(
          "contain",
          detailsOfIncident.additionalInformation
        );
        // end details of incident

        // details of company
        cy.get('[data-cy="preview-product-heading-1"]').should("exist");

        cy.get('[data-cy="product-additional-information-1"]').should(
          "contain",
          product.additionalInformation
        );
        cy.get('[data-cy="product-amount-imported-distributed-1"]').should(
          "contain",
          product.amountImportedDistributed
        );
        product.batchCodes.split("\n").forEach((batchCode) => {
          cy.get('[data-cy="product-batch-codes-1"]').should(
            "contain",
            batchCode
          );
        });
        cy.get('[data-cy="product-best-before-1"]').should(
          "contain",
          "Wednesday, February 1st, 2023"
        );
        cy.get('[data-cy="product-brand-1"]').should("contain", product.brand);
        cy.get('[data-cy="product-display-until-1"]').should(
          "contain",
          `Saturday, April 3rd, 1999`
        );
        cy.get('[data-cy="product-origin-country-1"]').should(
          "contain",
          product.originCountry
        );
        cy.get('[data-cy="product-pack-size-1"]').should(
          "contain",
          product.packSize
        );
        cy.get('[data-cy="product-package-description-1"]').should(
          "contain",
          product.packageDescription
        );
        cy.get('[data-cy="product-name-1"]').should(
          "contain",
          product.productName
        );
        cy.get('[data-cy="product-type-1"]').should(
          "contain",
          product.productType
        );
        cy.get('[data-cy="product-units-1"]').should(
          "contain",
          product.unitType
        );
        cy.get('[data-cy="product-use-by-1"]').should(
          "contain",
          `Monday, December 11th, 2023`
        );
        cy.get('[data-cy="preview-company-heading-1"]').should("exist");
      });
    });
  }
);
