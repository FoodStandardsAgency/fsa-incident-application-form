export const defaultFieldValues = {
  actionTaken: "I have notified the authorities",
  additionalInformation: "I also have told the police.",
  distributionDetails: "This was distributed to the South East",
  illnessDetails: "People are being sick",
  localAuthorityNotified: "I notified the following...",
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

    if (!fieldsToSkip.includes("action-taken")) {
      cy.get('[data-cy="action-taken"]').type(
        resolvedFieldValues.actionTaken,
        options
      );
    }

    if (!fieldsToSkip.includes("distribution-details")) {
      cy.get('[data-cy="distribution-details"]').type(
        resolvedFieldValues.distributionDetails,
        options
      );
    }

    if (!fieldsToSkip.includes("illness-details")) {
      cy.get('[data-cy="illness-details"]').type(
        resolvedFieldValues.illnessDetails,
        options
      );
    }

    if (!fieldsToSkip.includes("local-authority-notified")) {
      cy.get('[data-cy="local-authority-notified"]').type(
        resolvedFieldValues.localAuthorityNotified,
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
