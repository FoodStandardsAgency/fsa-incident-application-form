const defaultFieldValues = {
  natureOfProblem: "The nature of my problem is salmonella",
};

const options = {
  force: true,
};

Cypress.Commands.add(
  "fillInDetailsOfIncident",
  ({ fieldValues = defaultFieldValues, fieldsToSkip = [] } = {}) => {
    const resolvedFieldValues = {
      ...defaultFieldValues,
      ...fieldValues,
    };

    if (!fieldsToSkip.includes("nature-of-problem")) {
      cy.get('[data-cy="nature-of-problem"]').type(
        resolvedFieldValues.natureOfProblem,
        options
      );
    }

    cy.get('[data-cy="action-taken"]').type(
      "I have notified the authorities",
      options
    );

    cy.get('[data-cy="distribution-details"]').type(
      "This was distributed to the South East",
      options
    );

    cy.get('[data-cy="illness-details"]').type(
      "People are being sick",
      options
    );

    cy.get('[data-cy="local-authority-notified"]').type(
      "I notified the following...",
      options
    );

    cy.get('[data-cy="additional-information"]').type(
      "I also have told the police.",
      options
    );
  }
);
