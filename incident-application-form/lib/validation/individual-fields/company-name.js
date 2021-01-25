const validator = require("validator");

module.exports = {
  validateCompanyName: (companyName, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!companyName || validator.isEmpty(companyName.toString())) {
      return {
        companyName: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (
      companyName &&
      !validator.isLength(companyName.toString(), { min: 1, max: 255 })
    ) {
      validated.messages.push(
        i18n.companyName.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      companyName: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (companyName && companyName.toString()) || "",
      },
    };
  },
};
