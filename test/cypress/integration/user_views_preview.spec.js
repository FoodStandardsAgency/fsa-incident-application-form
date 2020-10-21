const YOUR_DETAILS = Cypress.config("contactDetails");
const PREVIEW = Cypress.config("preview");

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

    it(`Visit ${YOUR_DETAILS}, fill in some valid data, submit, prove it exists on the preview`, () => {
      cy.visit(YOUR_DETAILS);

      cy.get('[data-cy="notifier-type"]').select("Industry", {force: true});

      cy.get('[data-cy="contact-name"]').type("my name here", {force: true});

      cy.get('[data-cy="position"]').type("or should this be role?", {force: true});

      cy.get('[data-cy="organisation"]').type("organisation", {force: true});

      cy.get('[data-cy="email"]').type("my.email@somewhere.com", {force: true});

      cy.get('[data-cy="telephone1"]').type("01234 445 667", {force: true});

      cy.get('[data-cy="address.line1"]').type("line1", {force: true});

      cy.get('[data-cy="address.line2"]').type("line2", {force: true});

      cy.get('[data-cy="address.town"]').type("town", {force: true});

      cy.get('[data-cy="address.county"]').type("county", {force: true});

      cy.get('[data-cy="address.postcode"]').type("AB1 2CD", {force: true});

      cy.get('[data-cy="address.country"]').select("Norway", {force: true}); //?

      cy.get('[data-cy="submit"]').click({force: true});

      cy.get('[data-cy="nature-of-problem"]').type(
        "The nature of my problem is salmonella", {force: true}
      );

      cy.get('[data-cy="action-taken"]').type(
        "I have notified the authorities", {force: true}
      );

      cy.get('[data-cy="distribution-details"]').type(
        "This was distributed to the South East", {force: true}
      );

      cy.get('[data-cy="illness-details"]').type("People are being sick", {force: true});

      cy.get('[data-cy="local-authority-notified"]').type("Yes. I told Dave.", {force: true});

      cy.get('[data-cy="additional-information"]').type(
        "I also have told the police.", {force: true}
      );

      cy.get('[data-cy="submit"]').click({force: true});

      // shortcut; this is all meant to be on the session
      //  so for individual pages we can prove their content in isolation
      cy.visit(PREVIEW);

      //TODO sort dropdowns +retrofit this test step..
      // cy.get('[data-cy="notifier-type"]')
      //   .should( (text) => { expect(text).to.contain("Industry")});

      cy.get('[data-cy="contact-name"]').should((text) => {
        expect(text).to.contain("my name here");
      });

      cy.get('[data-cy="position"]').should((text) => {
        expect(text).to.contain("or should this be role?");
      });

      cy.get('[data-cy="organisation"]').should((text) => {
        expect(text).to.contain("organisation");
      });

      cy.get('[data-cy="email"]').should((text) => {
        expect(text).to.contain("my.email@somewhere.com");
      });

      cy.get('[data-cy="telephone1"]').should((text) => {
        expect(text).to.contain("01234 445 667");
      });

      cy.get('[data-cy="address.line1"]').should((text) => {
        expect(text).to.contain("line1");
      });

      cy.get('[data-cy="address.line2"]').should((text) => {
        expect(text).to.contain("line2");
      });

      cy.get('[data-cy="address.town"]').should((text) => {
        expect(text).to.contain("town");
      });

      cy.get('[data-cy="address.county"]').should((text) => {
        expect(text).to.contain("county");
      });

      cy.get('[data-cy="address.postcode"]').should((text) => {
        expect(text).to.contain("AB1 2CD");
      });

      //TODO sort dropdowns +retrofit this test step..
      // cy.get('[data-cy="address.country"]')
      //   .should( (text) => { expect(text).to.contain("Norway")});

      cy.get('[data-cy="nature-of-problem"]').should((text) => {
        expect(text).to.contain("The nature of my problem is salmonella");
      });

      cy.get('[data-cy="action-taken"]').should((text) => {
        expect(text).to.contain("I have notified the authorities");
      });

      cy.get('[data-cy="distribution-details"]').should((text) => {
        expect(text).to.contain("This was distributed to the South East");
      });

      cy.get('[data-cy="illness-details"]').should((text) => {
        expect(text).to.contain("People are being sick");
      });

      cy.get('[data-cy="local-authority-notified"]').should((text) => {
        expect(text).to.contain("Yes. I told Dave.");
      });

      cy.get('[data-cy="additional-information"]').should((text) => {
        expect(text).to.contain("I also have told the police.");
      });
    });
  }
);
