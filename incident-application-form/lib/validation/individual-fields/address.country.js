const validator = require("validator");

const defaultOptions = {
  required: true,
};

module.exports = {
  validateAddressCountry: (country, i18n, options) => {
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
      (!country || validator.isEmpty(country.toString())) &&
      !resolvedOptions.required
    ) {
      return {
        country: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (country && country.toString() === "0" && !resolvedOptions.required) {
      return {
        country: {
          ...validated,
          isValid: true,
          value: "0",
        },
      };
    }

    const requiredMessage =
      i18n.address.country.validation.required[i18n.languageCode];

    if (!country || validator.isEmpty(country.toString())) {
      validated.messages.push(requiredMessage);
    }

    if (country && country.toString() === "0") {
      if (!validated.messages.includes(requiredMessage)) {
        validated.messages.push(requiredMessage);
      }
    }

    return {
      country: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (country && country.toString()) || "",
      },
    };
  },
};
