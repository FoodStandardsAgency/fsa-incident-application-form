const validator = require("validator");

module.exports = {
  validateAdditionalInformation: (additionalInformation, i18n) => {
    return {
      additionalInformation: {
        isValid: true,
        messages: [],
        value:
          (additionalInformation &&
            validator.escape(additionalInformation.toString())) ||
          "",
      },
    };
  },
};
