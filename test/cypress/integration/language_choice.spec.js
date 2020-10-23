const ONLINE_FORM = Cypress.config("baseUrl");

const ENGLISH_PAGE_HEADING = "Report a food safety incident";
const WELSH_PAGE_HEADING = "Rhoi gwybod am ddigwyddiad diogelwch bwyd";

context(
  "As a Welsh or English service user, I want to access an online form in my own language, so I know what to do.",
  () => {
    beforeEach(() => {
      // catches, logs and ignores any load-errors on the page..
      // can probably delete this but worth including in 1st template in case we need it..
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err.stack);
        return false;
      });
    });

    it(`Visit ${ONLINE_FORM} in English`, () => {
      cy.visit(ONLINE_FORM);

      cy.get("[data-cy=index-page-heading]").should(
        "contain",
        ENGLISH_PAGE_HEADING
      );

      cy.get("[data-cy=language-picker-en]").click();
      cy.url().should("eq", `${ONLINE_FORM}/`);

      cy.get("[data-cy=language-picker-en]").should("have.class", "is-active");
      cy.get("[data-cy=language-picker-cy]").should(
        "not.have.class",
        "is-active"
      );

      cy.get("[data-cy=index-page-heading]").should(
        "contain",
        ENGLISH_PAGE_HEADING
      );
    });

    it(`Visit ${ONLINE_FORM} in Welsh`, () => {
      cy.visit(ONLINE_FORM);

      cy.get("[data-cy=index-page-heading]").should(
        "not.contain",
        WELSH_PAGE_HEADING
      );

      cy.get("[data-cy=language-picker-cy]").click();
      cy.url().should("eq", `${ONLINE_FORM}/cy`);

      cy.get("[data-cy=language-picker-en]").should(
        "not.have.class",
        "is-active"
      );
      cy.get("[data-cy=language-picker-cy]").should("have.class", "is-active");

      cy.get("[data-cy=index-page-heading]").should(
        "contain",
        WELSH_PAGE_HEADING
      );
    });
  }
);
