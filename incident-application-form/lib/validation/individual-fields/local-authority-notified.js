const validator = require("validator");

module.exports = {
  validateLocalAuthorityNotified: (localAuthorityNotified, i18n) => {
    return {
      localAuthorityNotified: {
        isValid: true,
        messages: [],
        value:
          (localAuthorityNotified &&
            validator.escape(localAuthorityNotified.toString())) ||
          "",
      },
    };
  },
};
