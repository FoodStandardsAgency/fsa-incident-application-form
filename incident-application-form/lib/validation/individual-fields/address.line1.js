const validator = require("validator");

module.exports = {
  validateAddressLine1: (line1, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!line1 || validator.isEmpty(line1.toString())) {
      return {
        line1: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (line1 && !validator.isLength(line1.toString(), { min: 1, max: 255 })) {
      validated.messages.push(
        i18n.address.line1.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      line1: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (line1 && validator.escape(line1.toString())) || "",
      },
    };
  },
};
