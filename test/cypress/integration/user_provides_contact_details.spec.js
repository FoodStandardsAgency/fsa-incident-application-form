const SIMS_LOOKUP_DATA = require("../fixtures/sample-dropdown-data.json");
const YOUR_DETAILS = Cypress.config("contactDetails");

const options = {
  force: true,
};

context(
  "As an incidents officer, I want the service user to provide their contact details, so that I can follow up with further questions.",
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

      it(`should be valid when all data is provided`, () => {
        cy.fillInContactDetails();

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]').should("not.exist");
      });

      it("should require the Notifier Type field", () => {
        cy.fillInContactDetails({
          fieldsToSkip: ["notifier-type"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Notifier type is required");

        cy.get('[data-cy="notifier-type-errors"]').should("exist");
      });

      it("should require a contact name", () => {
        cy.fillInContactDetails({
          fieldsToSkip: ["contact-name"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Full name is required");

        cy.get('[data-cy="contact-name-errors"]').should("exist");
      });

      it("should require a telephone number", () => {
        cy.fillInContactDetails({
          fieldsToSkip: ["telephone1"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Telephone is required");

        cy.get('[data-cy="telephone1-errors"]').should("exist");
      });

      it("should require a town or city", () => {
        cy.fillInContactDetails({
          fieldsToSkip: ["address.town"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "You must provide a town or city");

        cy.get('[data-cy="address.town-errors"]').should("exist");
      });

      it("should require a country", () => {
        cy.fillInContactDetails({
          fieldsToSkip: ["address.country"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Country is required");

        cy.get('[data-cy="address.country-errors"]').should("exist");
      });
    });

    describe("CY", () => {
      beforeEach(() => {
        cy.visit(`/cy/${YOUR_DETAILS}`);
      });

      it(`should be valid when all data is provided`, () => {
        cy.fillInContactDetails();

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]').should("not.exist");
      });

      it("should require the Notifier Type field", () => {
        cy.fillInContactDetails({
          fieldsToSkip: ["notifier-type"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Mae angen math o hysbysydd");

        cy.get('[data-cy="notifier-type-errors"]').should("exist");
      });

      it("should require a contact name", () => {
        cy.fillInContactDetails({
          fieldsToSkip: ["contact-name"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Mae angen enw llawn");

        cy.get('[data-cy="contact-name-errors"]').should("exist");
      });

      it("should require a telephone number", () => {
        cy.fillInContactDetails({
          fieldsToSkip: ["telephone1"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Mae angen ffôn");

        cy.get('[data-cy="telephone1-errors"]').should("exist");
      });

      it("should require a town or city", () => {
        cy.fillInContactDetails({
          fieldsToSkip: ["address.town"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Rhaid i chi ddarparu tref neu ddinas");

        cy.get('[data-cy="address.town-errors"]').should("exist");
      });

      it("should require a country", () => {
        cy.fillInContactDetails({
          fieldsToSkip: ["address.country"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Mae angen gwlad");

        cy.get('[data-cy="address.country-errors"]').should("exist");
      });
    });
  }
);
