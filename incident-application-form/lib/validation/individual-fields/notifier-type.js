const validator = require("validator");

module.exports = {
  validateNotifierType: (notifierType, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    const requiredMessage =
      i18n.notifierType.validation.required[i18n.languageCode];
    if (!notifierType || validator.isEmpty(notifierType)) {
      validated.messages.push(requiredMessage);
    }

    if (notifierType && notifierType.toString() === "0") {
      if (!validated.messages.includes(requiredMessage)) {
        validated.messages.push(requiredMessage);
      }
    }

    return {
      notifierType: {
        ...validated,
        isValid: validated.messages.length === 0,
        value:
          (notifierType && validator.escape(notifierType.toString())) || "",
      },
    };
  },
};
