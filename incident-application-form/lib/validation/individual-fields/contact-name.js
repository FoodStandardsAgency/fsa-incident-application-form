const validator = require("validator");

const defaultOptions = {
  required: true,
};

module.exports = {
  validateContactName: (contactName, i18n, options = {}) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    let resolvedOptions = {
      ...defaultOptions,
      ...options,
    };

    if (
      (!contactName || validator.isEmpty(contactName)) &&
      !resolvedOptions.required
    ) {
      return {
        contactName: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (!contactName || validator.isEmpty(contactName)) {
      validated.messages.push(
        i18n.contactName.validation.required[i18n.languageCode]
      );
    }

    if (
      contactName &&
      !validator.isLength(contactName.toString(), { min: 1, max: 255 })
    ) {
      validated.messages.push(
        i18n.contactName.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      contactName: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (contactName && contactName.toString()) || "",
      },
    };
  },
};
