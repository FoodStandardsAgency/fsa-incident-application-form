const YOUR_DETAILS = Cypress.config("contactDetails");

context(
  "As an incidents officer, I want the service user to provide their contact details, so that I can follow up with further questions.",
  () => {
    beforeEach(() => {
      // catches, logs and ignores any load-errors on the page..
      // can probably delete this but worth including in 1st template in case we need it..
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err.stack);
        return false;
      });
    });

    it(`Visit ${YOUR_DETAILS}, fill in some valid data, submit.`, () => {
      cy.visit(YOUR_DETAILS);

      cy.get('[data-cy="notifier-type"]').select("Industry", {force: true});

      cy.get('[data-cy="contact-name"]').type("my name here", {force: true});

      cy.get('[data-cy="position"]').type('or should this be "role"?', {force: true});

      cy.get('[data-cy="organisation"]').type("organisation", {force: true});

      //Email, Telephone 1, Telephone 2, [Address] Line 1, Line 2, Line 3, Town, County, Postcode, Country
      cy.get('[data-cy="email"]').type("my.email@somewhere.com", {force: true});

      cy.get('[data-cy="telephone1"]').type("01234 445 667", {force: true});

      cy.get('[data-cy="address.line1"]').type("line1", {force: true});

      cy.get('[data-cy="address.line2"]').type("line2", {force: true});

      cy.get('[data-cy="address.town"]').type("town", {force: true});

      cy.get('[data-cy="address.county"]').type("county", {force: true});

      cy.get('[data-cy="address.postcode"]').type("AB1 2CD", {force: true});

      cy.get('[data-cy="address.country"]').select("Norway", {force: true}); //?

      cy.get('[data-cy="submit"]').click({force: true});
    });
  }
);
