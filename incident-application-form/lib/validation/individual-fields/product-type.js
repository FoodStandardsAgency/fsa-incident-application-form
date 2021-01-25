const validator = require("validator");

module.exports = {
  validateProductType: (productType, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (productType && productType.toString() === "0") {
      return {
        productType: {
          ...validated,
          isValid: true,
        },
      };
    }

    return {
      productType: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (productType && productType.toString()) || "",
      },
    };
  },
};
