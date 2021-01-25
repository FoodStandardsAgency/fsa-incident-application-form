const validator = require("validator");

module.exports = {
  validateAddressLine2: (line2, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!line2 || validator.isEmpty(line2.toString())) {
      return {
        line2: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (line2 && !validator.isLength(line2.toString(), { min: 1, max: 255 })) {
      validated.messages.push(
        i18n.address.line2.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      line2: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (line2 && line2.toString()) || "",
      },
    };
  },
};
