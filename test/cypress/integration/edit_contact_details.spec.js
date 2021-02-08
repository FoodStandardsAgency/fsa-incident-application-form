const SIMS_LOOKUP_DATA = require("../fixtures/sample-dropdown-data.json");
const YOUR_DETAILS = Cypress.config("contactDetails");

const DETAILS_OF_INCIDENT = Cypress.config("detailsOfIncident");

const {
  defaultFieldValues,
} = require("../support/commands/fill-in-contact-details");

const options = {
  force: true,
};

context(
  "As an incidents officer, I want the service user to update their contact details, so that I can follow up with further questions.",
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
        yourDetailsPath: `/${YOUR_DETAILS}`,
        detailsOfIncidentPath: `/${DETAILS_OF_INCIDENT}`,
      },
      {
        languageCode: "cy",
        yourDetailsPath: `/cy/${YOUR_DETAILS}`,
        detailsOfIncidentPath: `/cy/${DETAILS_OF_INCIDENT}`,
      },
    ].forEach(({ languageCode, yourDetailsPath, detailsOfIncidentPath }) => {
      describe(languageCode.toUpperCase(), () => {
        beforeEach(() => {
          cy.visit(yourDetailsPath);

          cy.fillInContactDetails({
            fieldValues: {
              ...defaultFieldValues,
              ["address.country"]: 34,
            },
          });

          cy.get('[data-cy="submit"]').click(options);
          cy.get('[data-cy="error-summary"]').should("not.exist");

          cy.url().should("contain", detailsOfIncidentPath);

          cy.get('[data-cy="back"]').click(options);
        });

        it("should remember the given details", () => {
          cy.get('[data-cy="notifier-type"]')
            .find("option:selected")
            .should("have.text", defaultFieldValues.notifierType);

          cy.get('[data-cy="contact-name"]').should(
            "have.value",
            defaultFieldValues.contactName
          );

          cy.get('[data-cy="position"]').should(
            "have.value",
            defaultFieldValues.position
          );

          cy.get('[data-cy="organisation"]').should(
            "have.value",
            defaultFieldValues.organisation
          );

          cy.get('[data-cy="email"]').should(
            "have.value",
            defaultFieldValues.email
          );

          cy.get('[data-cy="telephone1"]').should(
            "have.value",
            defaultFieldValues.telephone1
          );

          cy.get('[data-cy="address.line1"]').should(
            "have.value",
            defaultFieldValues.address.line1
          );

          cy.get('[data-cy="address.line2"]').should(
            "have.value",
            defaultFieldValues.address.line2
          );

          cy.get('[data-cy="address.town"]').should(
            "have.value",
            defaultFieldValues.address.town
          );

          cy.get('[data-cy="address.county"]').should(
            "have.value",
            defaultFieldValues.address.county
          );

          cy.get('[data-cy="address.postcode"]').should(
            "have.value",
            defaultFieldValues.address.postcode
          );

          cy.get('[data-cy="address.country"]')
            .find("option:selected")
            .should("have.text", "Norway");
        });
      });
    });
  }
);
