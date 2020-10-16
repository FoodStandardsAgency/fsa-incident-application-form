const { allValid } = require("./all-valid");
const { validateIncidentTitle } = require("./individual-fields/incident-title");
const {
  validateNatureOfProblem,
} = require("./individual-fields/nature-of-problem");
const { validateActionTaken } = require("./individual-fields/action-taken");
const {
  validateAdditionalInformation,
} = require("./individual-fields/additional-information");
const {
  validateDistributionDetails,
} = require("./individual-fields/distribution-details");
const {
  validateIllnessDetails,
} = require("./individual-fields/illness-details");
const {
  validateLocalAuthorityNotified,
} = require("./individual-fields/local-authority-notified");

module.exports = {
  validate: (
    {
      incidentTitle,
      natureOfProblem,
      actionTaken,
      distributionDetails,
      illnessDetails,
      localAuthorityNotified,
      additionalInformation,
    },
    i18n
  ) => {
    const validatedIncidentTitle = validateIncidentTitle(incidentTitle, i18n);
    const validatedNatureOfProblem = validateNatureOfProblem(
      natureOfProblem,
      i18n
    );
    const validatedActionTaken = validateActionTaken(actionTaken, i18n);
    const validatedAdditionalInformation = validateAdditionalInformation(
      additionalInformation,
      i18n
    );
    const validatedDistributionDetails = validateDistributionDetails(
      distributionDetails,
      i18n
    );
    const validatedIllnessDetails = validateIllnessDetails(
      illnessDetails,
      i18n
    );
    const validatedLocalAuthorityNotified = validateLocalAuthorityNotified(
      localAuthorityNotified,
      i18n
    );

    const isValid = allValid([
      validatedIncidentTitle,
      validatedNatureOfProblem,
      validatedActionTaken,
      validatedAdditionalInformation,
      validatedDistributionDetails,
      validatedIllnessDetails,
      validatedLocalAuthorityNotified,
    ]);

    return {
      isValid,
      validatedFields: {
        ...validatedIncidentTitle,
        ...validatedNatureOfProblem,
        ...validatedActionTaken,
        ...validatedAdditionalInformation,
        ...validatedDistributionDetails,
        ...validatedIllnessDetails,
        ...validatedLocalAuthorityNotified,
      },
    };
  },
};
