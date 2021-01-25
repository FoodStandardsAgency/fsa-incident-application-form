const validator = require("validator");

module.exports = {
  validateUnitType: (unitType, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (unitType && unitType.toString() === "0") {
      return {
        unitType: {
          ...validated,
          isValid: true,
        },
      };
    }

    return {
      unitType: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (unitType && unitType.toString()) || "",
      },
    };
  },
};
