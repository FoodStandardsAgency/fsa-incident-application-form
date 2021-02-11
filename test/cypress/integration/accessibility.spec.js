const ONLINE_FORM = Cypress.config("baseUrl");

context(
  "As a service user with additional accessibility needs, I want to understand the FSA's accessibility stance, so that I know when my specific accessibility-needs will be met.",
  () => {
    beforeEach(() => {
      // catches, logs and ignores any load-errors on the page..
      // can probably delete this but worth including in 1st template in case we need it..
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err.stack);
        return false;
      });
    });

    [
      {
        languageCode: "en",
        homepage: ONLINE_FORM,
      },
      {
        languageCode: "cy",
        homepage: `${ONLINE_FORM}/cy`,
      },
    ].forEach(({ languageCode, homepage }) => {
      describe(languageCode.toUpperCase(), () => {
        it(`Visit ${homepage} and confirm the Accessibility link`, () => {
          cy.visit(homepage);

          cy.get("[data-cy=accessibility]")
            .should("contain", "Accessibility")
            .click({ force: true });

          cy.get("[data-cy=page-heading]").should("contain", "Accessibility");

          // confirm the presence of the privacy link, although since it redirects away from our site: we shouldn't follow it in our test
          cy.get("[data-cy=privacy]").should("contain", "Privacy");
        });
      });
    });
  }
);
