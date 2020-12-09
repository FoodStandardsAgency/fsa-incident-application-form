const ONLINE_FORM = Cypress.config("baseUrl");

context(
  "As a service user, I want to know how this site uses cookies, so that I can be confident the FSA is treating my online identity with respect.",
  () => {
    beforeEach(() => {
      // catches, logs and ignores any load-errors on the page..
      // can probably delete this but worth including in 1st template in case we need it..
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err.stack);
        return false;
      });
    });

    it(`Visit ${ONLINE_FORM} and confirm the cookies link`, () => {
      cy.visit(ONLINE_FORM);
      cy.get("[data-cy=cookies]")
        .should("contain", "Cookies")
        .click({ force: true });
      cy.get("[data-cy=page-heading]").should("contain","Cookies");
    });

    xit(`Visit ${ONLINE_FORM}/cy and confirm the cookies link`, () => {
      cy.visit(`${ONLINE_FORM}/cy`);
    });
  }
);
