const validator = require("validator");

module.exports = {
  validateIllnessDetails: (illnessDetails, i18n) => {
    return {
      illnessDetails: {
        isValid: true,
        messages: [],
        value:
          (illnessDetails && validator.escape(illnessDetails.toString())) || "",
      },
    };
  },
};
