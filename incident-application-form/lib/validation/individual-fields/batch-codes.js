const validator = require("validator");

module.exports = {
  validateBatchCodes: (batchCodes, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!batchCodes || validator.isEmpty(batchCodes.toString())) {
      return {
        batchCodes: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    return {
      batchCodes: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (batchCodes && batchCodes.toString().trim()) || "",
      },
    };
  },
};
