const validator = require("validator");

module.exports = {
  validateBrand: (brand, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!brand || validator.isEmpty(brand.toString())) {
      return {
        brand: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (brand && !validator.isLength(brand.toString(), { min: 1, max: 255 })) {
      validated.messages.push(
        i18n.brand.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      brand: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (brand && brand.toString()) || "",
      },
    };
  },
};
