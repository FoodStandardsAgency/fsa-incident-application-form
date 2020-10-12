const ONLINE_FORM = Cypress.config('baseUrl');

context('As a service user, I want to access an online form to report an incident, so that I can fulfil my legal obligation in a convenient way.', () => {

  beforeEach(() => {
    // catches, logs and ignores any load-errors on the page..
    // can probably delete this but worth including in 1st template in case we need it..
    cy.on('uncaught:exception', (err, runnable) => { console.log(err.stack); return false; });
  });

  it(`Visit ${ONLINE_FORM}`, () => {
    cy.visit(ONLINE_FORM);
  });
});
