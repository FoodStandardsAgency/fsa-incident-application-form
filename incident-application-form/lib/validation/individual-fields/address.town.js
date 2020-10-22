const validator = require("validator");

const defaultOptions = {
  required: true,
};

module.exports = {
  validateAddressTown: (town, i18n, options) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    let resolvedOptions = {
      ...defaultOptions,
      ...options,
    };

    if ((!town || validator.isEmpty(town)) && !resolvedOptions.required) {
      return {
        town: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

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
