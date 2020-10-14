const validator = require("validator");

module.exports = {
  validateAddressTown: (town, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!town || validator.isEmpty(town)) {
      validated.messages.push(
        i18n.address.town.validation.required[i18n.languageCode]
      );
    }

    if (town && !validator.isLength(town.toString(), { min: 1, max: 255 })) {
      validated.messages.push(
        i18n.address.town.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      town: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (town && validator.escape(town.toString())) || "",
      },
    };
  },
};
