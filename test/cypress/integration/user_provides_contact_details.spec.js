const YOUR_DETAILS = Cypress.config('contactDetails');

context('As an incidents officer, I want the service user to provide their contact details, so that I can follow up with further questions.', () => {

  beforeEach(() => {
    // catches, logs and ignores any load-errors on the page..
    // can probably delete this but worth including in 1st template in case we need it..
    cy.on('uncaught:exception', (err, runnable) => { console.log(err.stack); return false; });
  });

  it(`Visit ${YOUR_DETAILS}, fill in some valid data, submit.`, () => {
    cy.visit(YOUR_DETAILS);

    cy.get('[data-cy="notifier-type"]')
      .select('industry');

    cy.get('[data-cy="contact-name"]')
      .type('my name here');

    cy.get('[data-cy="position"]')
      .type('or should this be "role"?');

    cy.get('[data-cy="organisation"]')
      .type('organisation');

//Email, Telephone 1, Telephone 2, [Address] Line 1, Line 2, Line 3, Town, County, Postcode, Country
  cy.get('[data-cy="email"]')
    .type('my.email@somewhere.com');

  cy.get('[data-cy="telephone1"]')
    .type('01234 445 667');

  cy.get('[data-cy="telephone2"]')
    .type('02243 665 443');

  cy.get('[data-cy="address.line1"]')
    .type('line1');

  cy.get('[data-cy="address.line2"]')
    .type('line2');

  cy.get('[data-cy="address.line3"]')
    .type('line3');

  cy.get('[data-cy="address.town"]')
    .type('town');

  cy.get('[data-cy="address.county"]')
    .type('county');

  cy.get('[data-cy="address.postcode"]')
    .type('AB1 2CD');

  cy.get('[data-cy="address.country"]')
    .select('norway');//?


    cy.get('[data-cy="submit"]').click();
  });
});
