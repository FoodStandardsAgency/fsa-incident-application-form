const validator = require("validator");

module.exports = {
  validateAddressCountry: (country, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

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
        value: (country && validator.escape(country.toString())) || "",
      },
    };
  },
};
