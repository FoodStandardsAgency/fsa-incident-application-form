const defaultFieldValues = {
  companyName: "A test company name",
  companyType: "Distributor",
  contactName: "Johnny Tester",
  email: "johnny.tester@example.com",
  telephone1: "+44 1883 123 456",
  address: {
    line1: "1 Test Street",
    line2: "Testway",
    town: "town",
    county: "Testshire",
    postcode: "TE1 5ST",
    country: "Burma",
  },
};

const options = {
  force: true,
};

Cypress.Commands.add(
  "fillInCompany",
  ({ fieldValues = defaultFieldValues, fieldsToSkip = [] } = {}) => {
    const resolvedFieldValues = {
      ...defaultFieldValues,
      ...fieldValues,
    };

    if (!fieldsToSkip.includes("company-type")) {
      cy.get('[data-cy="company-type"]').select(
        resolvedFieldValues.companyType,
        options
      );
    }

    if (!fieldsToSkip.includes("company-name")) {
      cy.get('[data-cy="company-name"]').type(
        resolvedFieldValues.companyName,
        options
      );
    }

    if (!fieldsToSkip.includes("contact-name")) {
      cy.get('[data-cy="contact-name"]').type(
        resolvedFieldValues.contactName,
        options
      );
    }

    if (!fieldsToSkip.includes("email")) {
      cy.get('[data-cy="email"]').type(resolvedFieldValues.email, options);
    }

    if (!fieldsToSkip.includes("telephone1")) {
      cy.get('[data-cy="telephone1"]').type(
        resolvedFieldValues.telephone1,
        options
      );
    }

    if (!fieldsToSkip.includes("address.line1")) {
      cy.get('[data-cy="address.line1"]').type(
        resolvedFieldValues.address.line1,
        options
      );
    }

    if (!fieldsToSkip.includes("address.line2")) {
      cy.get('[data-cy="address.line2"]').type(
        resolvedFieldValues.address.line2,
        options
      );
    }

    if (!fieldsToSkip.includes("address.town")) {
      cy.get('[data-cy="address.town"]').type(
        resolvedFieldValues.address.town,
        options
      );
    }

    if (!fieldsToSkip.includes("address.county")) {
      cy.get('[data-cy="address.county"]').type(
        resolvedFieldValues.address.county,
        options
      );
    }

    if (!fieldsToSkip.includes("address.postcode")) {
      cy.get('[data-cy="address.postcode"]').type(
        resolvedFieldValues.address.postcode,
        options
      );
    }

    if (!fieldsToSkip.includes("address.country")) {
      cy.get('[data-cy="address.country"]').select(
        resolvedFieldValues.address.country,
        options
      );
    }
  }
);
