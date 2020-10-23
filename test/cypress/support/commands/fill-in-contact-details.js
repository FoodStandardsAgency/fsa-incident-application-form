const defaultFieldValues = {
  notifierType: "Industry",
  contactName: "my name here",
  telephone1: "01234 445 667",
  address: {
    town: "town",
    country: "Norway",
  },
};

const options = {
  force: true,
};

Cypress.Commands.add(
  "fillInContactDetails",
  ({ fieldValues = defaultFieldValues, fieldsToSkip = [] } = {}) => {
    const resolvedFieldValues = {
      ...defaultFieldValues,
      ...fieldValues,
    };

    if (!fieldsToSkip.includes("notifier-type")) {
      cy.get('[data-cy="notifier-type"]').select(
        resolvedFieldValues.notifierType,
        options
      );
    }

    if (!fieldsToSkip.includes("contact-name")) {
      cy.get('[data-cy="contact-name"]').type(resolvedFieldValues.contactName, {
        force: true,
      });
    }

    cy.get('[data-cy="position"]').type('or should this be "role"?', {
      force: true,
    });

    cy.get('[data-cy="organisation"]').type("organisation", options);

    //Email, Telephone 1, Telephone 2, [Address] Line 1, Line 2, Line 3, Town, County, Postcode, Country
    cy.get('[data-cy="email"]').type("my.email@somewhere.com", {
      force: true,
    });

    if (!fieldsToSkip.includes("telephone1")) {
      cy.get('[data-cy="telephone1"]').type(
        resolvedFieldValues.telephone1,
        options
      );
    }

    cy.get('[data-cy="address.line1"]').type("line1", options);

    cy.get('[data-cy="address.line2"]').type("line2", options);

    if (!fieldsToSkip.includes("address.town")) {
      cy.get('[data-cy="address.town"]').type(
        resolvedFieldValues.address.town,
        options
      );
    }

    cy.get('[data-cy="address.county"]').type("county", options);

    cy.get('[data-cy="address.postcode"]').type("AB1 2CD", options);

    if (!fieldsToSkip.includes("address.country")) {
      cy.get('[data-cy="address.country"]').select(
        resolvedFieldValues.address.country,
        options
      );
    }
  }
);
