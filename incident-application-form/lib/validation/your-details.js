const validator = require("validator");

module.exports = {
  validate: ({ notifierType, contactName }, i18n) => {
    const validated = {
      contactName: {
        isValid: false,
        messages: [],
        value: "",
      },
      notifierType: {
        isValid: false,
        messages: [],
        value: "",
      },
    };

    if (!notifierType || validator.isEmpty(notifierType)) {
      validated.notifierType.messages.push(
        i18n.notifierType.validation.required[i18n.languageCode]
      );
    }

    if (!contactName || validator.isEmpty(contactName)) {
      validated.contactName.messages.push(
        i18n.contactName.validation.required[i18n.languageCode]
      );
    }

    if (contactName && !validator.isLength(contactName, { min: 1, max: 100 })) {
      validated.contactName.messages.push(
        i18n.contactName.validation.invalidLength[i18n.languageCode]
      );
    }

    const isValidContactName = validated.contactName.messages.length === 0;
    const isValidNotifierType = validated.notifierType.messages.length === 0;

    return {
      isValid: isValidContactName && isValidNotifierType,
      validatedFields: {
        contactName: {
          isValid: isValidContactName,
          messages: validated.contactName.messages,
          value: (contactName && validator.escape(contactName)) || "",
        },
        notifierType: {
          isValid: isValidNotifierType,
          messages: validated.notifierType.messages,
          value: (notifierType && validator.escape(notifierType)) || "",
        },
      },
    };
  },
};
