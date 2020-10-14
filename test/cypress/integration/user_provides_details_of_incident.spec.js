const DETAILS_OF_INCIDENT = Cypress.config("detailsOfIncident");

context(
  "As an incidents officer, I want to know what the incident is, so that I can effectively investigate and act.",
  () => {
    beforeEach(() => {
      // catches, logs and ignores any load-errors on the page..
      // can probably delete this but worth including in 1st template in case we need it..
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err.stack);
        return false;
      });
    });

    it(`Visit ${DETAILS_OF_INCIDENT}, fill in some valid data, submit.`, () => {
      cy.visit(DETAILS_OF_INCIDENT);

      cy.get('[data-cy="nature-of-problem"]').type(
        "The nature of my problem is salmonella"
      );

      cy.get('[data-cy="action-taken"]').type(
        "I have notified the authorities"
      );

      cy.get('[data-cy="distribution-details"]').type(
        "This was distributed to the South East"
      );

      cy.get('[data-cy="illness-details"]').type("People are being sick");

      // intentionally blank, still valid
      // cy.get('[data-cy="local-authority-notified"]').type("");

      cy.get('[data-cy="additional-information"]').type(
        "I also have told the police."
      );

      cy.get('[data-cy="submit"]').click();
    });
  }
);
