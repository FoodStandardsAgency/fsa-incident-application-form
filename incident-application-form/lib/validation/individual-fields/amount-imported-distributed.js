const validator = require("validator");

module.exports = {
  validateAmountImportedDistributed: (amountImportedDistributed, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (
      !amountImportedDistributed ||
      validator.isEmpty(amountImportedDistributed.toString())
    ) {
      return {
        amountImportedDistributed: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (
      amountImportedDistributed &&
      !validator.isLength(amountImportedDistributed.toString(), {
        min: 1,
        max: 255,
      })
    ) {
      validated.messages.push(
        i18n.amountImportedDistributed.validation.invalidLength[
          i18n.languageCode
        ]
      );
    }

    if (
      amountImportedDistributed &&
      !validator.isNumeric(amountImportedDistributed.toString())
    ) {
      validated.messages.push(
        i18n.amountImportedDistributed.validation.invalidNumber[
          i18n.languageCode
        ]
      );
    }

    return {
      amountImportedDistributed: {
        ...validated,
        isValid: validated.messages.length === 0,
        value:
          (amountImportedDistributed && amountImportedDistributed.toString()) ||
          "",
      },
    };
  },
};
