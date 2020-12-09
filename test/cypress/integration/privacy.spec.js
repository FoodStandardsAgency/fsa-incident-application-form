const ONLINE_FORM = Cypress.config("baseUrl");

context(
  "As a service user, I want to know how this site uses my data, so that I can make an informed decision on whether or not to provide the data.",
  () => {
    beforeEach(() => {
      // catches, logs and ignores any load-errors on the page..
      // can probably delete this but worth including in 1st template in case we need it..
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err.stack);
        return false;
      });
    });

    it(`Visit ${ONLINE_FORM} and confirm the privacy link exists..`, () => {
      cy.visit(ONLINE_FORM);
      cy.get("[data-cy=privacy]").should("contain", "Privacy");
      // external link so can't follow it; maybe want to check it's href?
    });

    xit(`Visit ${ONLINE_FORM}/cy and confirm the privacy link exists..`, () => {
      cy.visit(`${ONLINE_FORM}/cy`);
    });
  }
);
