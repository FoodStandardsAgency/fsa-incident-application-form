const validator = require("validator");

module.exports = {
  validateProductName: (productName, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!productName || validator.isEmpty(productName)) {
      validated.messages.push(
        i18n.productName.validation.required[i18n.languageCode]
      );
    }

    if (
      productName &&
      !validator.isLength(productName.toString(), { min: 1, max: 255 })
    ) {
      validated.messages.push(
        i18n.productName.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      productName: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (productName && validator.escape(productName.toString())) || "",
      },
    };
  },
};
