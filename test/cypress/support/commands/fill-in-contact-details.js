export const defaultFieldValues = {
  notifierType: "Manufacturer",
  contactName: "my name here",
  email: "my.email@somewhere.com",
  organisation: "Test corp",
  position: "my position",
  telephone1: "01234 445 667",
  address: {
    line1: "123 Test Street",
    line2: "Testfield",
    town: "Testingtown",
    county: "Testshire",
    postcode: "TE1 5ST",
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

    if (!fieldsToSkip.includes("position")) {
      cy.get('[data-cy="position"]').type(resolvedFieldValues.position, {
        force: true,
      });
    }

    if (!fieldsToSkip.includes("organisation")) {
      cy.get('[data-cy="organisation"]').type(
        resolvedFieldValues.organisation,
        options
      );
    }

    if (!fieldsToSkip.includes("email")) {
      cy.get('[data-cy="email"]').type(resolvedFieldValues.email, {
        force: true,
      });
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
