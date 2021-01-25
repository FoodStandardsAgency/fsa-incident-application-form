const validator = require("validator");

module.exports = {
  validateAddressPostcode: (postcode, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!postcode || validator.isEmpty(postcode.toString())) {
      return {
        postcode: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    const locale = "GB";
    if (postcode && !validator.isPostalCode(postcode.toString(), locale)) {
      validated.messages.push(
        i18n.address.postcode.validation.invalid[i18n.languageCode]
      );
    }

    return {
      postcode: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (postcode && postcode.toString()) || "",
      },
    };
  },
};
