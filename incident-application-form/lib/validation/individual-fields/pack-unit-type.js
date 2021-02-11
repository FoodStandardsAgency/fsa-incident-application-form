const validator = require("validator");

module.exports = {
  validatePackUnitType: (packUnitType, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (packUnitType && packUnitType.toString() === "0") {
      return {
        packUnitType: {
          ...validated,
          isValid: true,
        },
      };
    }

    return {
      packUnitType: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (packUnitType && packUnitType.toString()) || "",
      },
    };
  },
};
