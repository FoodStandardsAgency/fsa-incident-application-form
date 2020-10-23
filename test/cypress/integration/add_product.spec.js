const ADD_PRODUCT = Cypress.config("product");

const options = { force: true };

export const optionalFields = [
  "additional-information",
  "amount-imported-distributed",
  "batch-codes",
  "best-before-day",
  "best-before-month",
  "best-before-year",
  "brand",
  "display-until-day",
  "display-until-month",
  "display-until-year",
  "pack-size",
  "package-description",
  "product-type",
  "unit-type",
  "use-by-day",
  "use-by-month",
  "use-by-year",
];

context(
  "As an incidents officer, I want to know about the products affected, so I can effectively investigate and act.",
  () => {
    beforeEach(() => {
      cy.clearCookies();

      // catches, logs and ignores any load-errors on the page..
      // can probably delete this but worth including in 1st template in case we need it..
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err.stack);
        return false;
      });
    });

    describe("EN", () => {
      beforeEach(() => {
        cy.visit(ADD_PRODUCT);
      });

      it("should have an add company button", () => {
        cy.get("[data-cy=add-company]").should("contain", "Add Company");
      });

      it("should have a back button", () => {
        cy.get("[data-cy=back]").should("contain", "Previous");
      });

      it("should have a save and continue button", () => {
        cy.get("[data-cy=submit]").should("contain", "Save and Continue");
      });

      it(`should require at least one company`, () => {
        cy.fillInProduct();

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "At least one company is required");
      });

      it("should require a product name", () => {
        cy.fillInProduct({
          fieldsToSkip: ["product-name"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Product name is required");
      });

      it("should require a country", () => {
        cy.fillInProduct({
          fieldsToSkip: ["origin-country"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Country is required");
      });
    });

    describe("CY", () => {
      beforeEach(() => {
        cy.visit(`/cy/${ADD_PRODUCT}`);
      });

      it("should have an add company button", () => {
        cy.get("[data-cy=add-company]").should("contain", "Ychwanegu Cwmni");
      });

      it("should have a back button", () => {
        cy.get("[data-cy=back]").should("contain", "Blaenorol");
      });

      it("should have a save and continue button", () => {
        cy.get("[data-cy=submit]").should("contain", "Arbed a pharhau");
      });

      it(`should require at least one company`, () => {
        cy.fillInProduct();

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Mae angen o leiaf un cwmni");
      });

      it("should require a product name", () => {
        cy.fillInProduct({
          fieldsToSkip: ["product-name"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Mae angen enw'r cynnyrch");
      });

      it("should require a country", () => {
        cy.fillInProduct({
          fieldsToSkip: ["origin-country"],
        });

        cy.get('[data-cy="submit"]').click(options);

        cy.get('[data-cy="error-summary"]')
          .should("exist")
          .should("contain", "Mae angen gwlad");
      });
    });
  }
);
