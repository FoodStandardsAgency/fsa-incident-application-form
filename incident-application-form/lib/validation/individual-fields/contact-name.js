const validator = require("validator");

module.exports = {
  validateContactName: (contactName, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!contactName || validator.isEmpty(contactName)) {
      validated.messages.push(
        i18n.contactName.validation.required[i18n.languageCode]
      );
    }

    if (
      contactName &&
      !validator.isLength(contactName.toString(), { min: 1, max: 255 })
    ) {
      validated.messages.push(
        i18n.contactName.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      contactName: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (contactName && validator.escape(contactName.toString())) || "",
      },
    };
  },
};
