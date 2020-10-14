const validator = require("validator");

module.exports = {
  validatePosition: (position, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!position || validator.isEmpty(position.toString())) {
      return {
        position: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (
      position &&
      !validator.isLength(position.toString(), { min: 1, max: 255 })
    ) {
      validated.messages.push(
        i18n.position.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      position: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (position && validator.escape(position.toString())) || "",
      },
    };
  },
};
