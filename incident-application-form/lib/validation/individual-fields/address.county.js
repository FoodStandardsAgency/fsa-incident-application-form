const validator = require("validator");

module.exports = {
  validateAddressCounty: (county, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!county || validator.isEmpty(county.toString())) {
      return {
        county: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (
      county &&
      !validator.isLength(county.toString(), { min: 1, max: 255 })
    ) {
      validated.messages.push(
        i18n.address.county.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      county: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (county && validator.escape(county.toString())) || "",
      },
    };
  },
};
