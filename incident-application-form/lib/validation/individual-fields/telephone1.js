const validator = require("validator");

const defaultOptions = {
  required: true,
};

module.exports = {
  validateTelephone1: (telephone, i18n, options) => {
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
      (!telephone || validator.isEmpty(telephone)) &&
      !resolvedOptions.required
    ) {
      return {
        telephone1: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (!telephone || validator.isEmpty(telephone)) {
      validated.messages.push(
        i18n.telephone1.validation.required[i18n.languageCode]
      );
    }

    const invalidMessage =
      i18n.telephone1.validation.invalid[i18n.languageCode];

    if (
      telephone &&
      !validator.isLength(telephone.toString(), { min: 1, max: 60 })
    ) {
      validated.messages.push(invalidMessage);
    }

    if (
      telephone &&
      !validator.isWhitelisted(telephone.toString(), " +0123456789")
    ) {
      if (!validated.messages.includes(invalidMessage))
        validated.messages.push(invalidMessage);
    }

    return {
      telephone1: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (telephone && telephone.toString()) || "",
      },
    };
  },
};
