export const defaultFieldValues = {
  additionalInformation: "Some additional info...",
  amountImportedDistributed: "183",
  batchCodes: `
  aaa-bbb
  ccc-ddd
  xxx-zzz
  `,
  bestBefore: {
    day: "1",
    month: "2",
    year: "2023",
  },
  brand: "Testco",
  displayUntil: {
    day: "3",
    month: "4",
    year: "1999",
  },
  originCountry: "United Kingdom",
  packSize: "6",
  packUnitType: "Tonnes (t)",
  packageDescription: "Plastic wrap",
  productName: "An example product name",
  productType: "Alcoholic Beverages",
  unitType: "Kilograms (kg)",
  useBy: {
    day: "11",
    month: "12",
    year: "2020",
  },
};

const options = {
  force: true,
};

Cypress.Commands.add(
  "fillInProduct",
  ({ fieldValues = defaultFieldValues, fieldsToSkip = [] } = {}) => {
    const resolvedFieldValues = {
      ...defaultFieldValues,
      ...fieldValues,
    };

    if (!fieldsToSkip.includes("product-name")) {
      cy.get('[data-cy="product-name"]').type(
        resolvedFieldValues.productName,
        options
      );
    }

    if (!fieldsToSkip.includes("brand")) {
      cy.get('[data-cy="brand"]').type(resolvedFieldValues.brand, options);
    }

    if (!fieldsToSkip.includes("product-type")) {
      cy.get('[data-cy="product-type"]').select(
        resolvedFieldValues.productType,
        options
      );
    }

    if (!fieldsToSkip.includes("batch-codes")) {
      cy.get('[data-cy="batch-codes"]').type(
        resolvedFieldValues.batchCodes,
        options
      );
    }

    if (!fieldsToSkip.includes("origin-country")) {
      cy.get('[data-cy="origin-country"]').select(
        resolvedFieldValues.originCountry,
        options
      );
    }

    if (!fieldsToSkip.includes("amount-imported-distributed")) {
      cy.get('[data-cy="amount-imported-distributed"]').type(
        resolvedFieldValues.amountImportedDistributed,
        options
      );
    }

    if (!fieldsToSkip.includes("unit-type")) {
      cy.get('[data-cy="unit-type"]').select(
        resolvedFieldValues.unitType,
        options
      );
    }

    if (!fieldsToSkip.includes("best-before-day")) {
      cy.get('[data-cy="best-before-day"]').type(
        resolvedFieldValues.bestBefore.day,
        options
      );
    }

    if (!fieldsToSkip.includes("best-before-month")) {
      cy.get('[data-cy="best-before-month"]').type(
        resolvedFieldValues.bestBefore.month,
        options
      );
    }

    if (!fieldsToSkip.includes("best-before-year")) {
      cy.get('[data-cy="best-before-year"]').type(
        resolvedFieldValues.bestBefore.year,
        options
      );
    }

    if (!fieldsToSkip.includes("use-by-day")) {
      cy.get('[data-cy="use-by-day"]').type(
        resolvedFieldValues.useBy.day,
        options
      );
    }

    if (!fieldsToSkip.includes("use-by-month")) {
      cy.get('[data-cy="use-by-month"]').type(
        resolvedFieldValues.useBy.month,
        options
      );
    }

    if (!fieldsToSkip.includes("use-by-year")) {
      cy.get('[data-cy="use-by-year"]').type(
        resolvedFieldValues.bestBefore.year,
        options
      );
    }

    if (!fieldsToSkip.includes("display-until-day")) {
      cy.get('[data-cy="display-until-day"]').type(
        resolvedFieldValues.displayUntil.day,
        options
      );
    }

    if (!fieldsToSkip.includes("display-until-month")) {
      cy.get('[data-cy="display-until-month"]').type(
        resolvedFieldValues.displayUntil.month,
        options
      );
    }

    if (!fieldsToSkip.includes("display-until-year")) {
      cy.get('[data-cy="display-until-year"]').type(
        resolvedFieldValues.displayUntil.year,
        options
      );
    }

    if (!fieldsToSkip.includes("pack-size")) {
      cy.get('[data-cy="incident-product-pack-size"]').type(
        resolvedFieldValues.packSize,
        options
      );
    }

    if (!fieldsToSkip.includes("pack-unit-type")) {
      cy.get('[data-cy="incident-product-pack-unit-type"]').select(
        resolvedFieldValues.packUnitType,
        options
      );
    }

    if (!fieldsToSkip.includes("package-description")) {
      cy.get('[data-cy="package-description"]').type(
        resolvedFieldValues.packageDescription,
        options
      );
    }

    if (!fieldsToSkip.includes("additional-information")) {
      cy.get('[data-cy="additional-information"]').type(
        resolvedFieldValues.additionalInformation,
        options
      );
    }
  }
);
