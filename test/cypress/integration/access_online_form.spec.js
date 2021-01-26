const ONLINE_FORM = Cypress.config("baseUrl");
const YOUR_DETAILS = Cypress.config("contactDetails");

const options = { force: true };

context(
  "As a service user, I want to access an online form to report an incident, so that I can fulfil my legal obligation in a convenient way.",
  () => {
    beforeEach(() => {
      // catches, logs and ignores any load-errors on the page..
      // can probably delete this but worth including in 1st template in case we need it..
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err.stack);
        return false;
      });
    });

    describe("EN", () => {
      it(`Visit ${ONLINE_FORM}`, () => {
        cy.visit(ONLINE_FORM);

        const startButton = cy.get("[data-cy=start-button]");

        startButton.should("contain", "Start");
        startButton.click(options);

        cy.url().should("contain", `/${YOUR_DETAILS}`);
      });
    });

    describe("CY", () => {
      it(`Visit ${ONLINE_FORM}/cy`, () => {
        cy.visit(`${ONLINE_FORM}/cy`);

        const startButton = cy.get("[data-cy=start-button]");

        startButton.should("contain", "Dechrau");
        startButton.click(options);

        cy.url().should("contain", `/cy/${YOUR_DETAILS}`);
      });
    });
  }
);
