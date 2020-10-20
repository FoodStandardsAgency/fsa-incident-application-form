const validator = require("validator");

module.exports = {
  validatePackSize: (packSize, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!packSize || validator.isEmpty(packSize.toString())) {
      return {
        packSize: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (
      packSize &&
      !validator.isLength(packSize.toString(), { min: 1, max: 255 })
    ) {
      validated.messages.push(
        i18n.packSize.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      packSize: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (packSize && validator.escape(packSize.toString())) || "",
      },
    };
  },
};
