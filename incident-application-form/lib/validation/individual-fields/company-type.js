const validator = require("validator");

module.exports = {
  validateCompanyType: (companyType, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    const requiredMessage =
      i18n.companyType.validation.required[i18n.languageCode];
    if (!companyType || validator.isEmpty(companyType)) {
      validated.messages.push(requiredMessage);
    }

    if (companyType && companyType.toString() === "0") {
      if (!validated.messages.includes(requiredMessage)) {
        validated.messages.push(requiredMessage);
      }
    }

    return {
      companyType: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (companyType && companyType.toString()) || "",
      },
    };
  },
};
