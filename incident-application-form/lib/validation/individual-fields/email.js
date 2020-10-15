const validator = require("validator");

module.exports = {
  validateEmail: (email, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!email || validator.isEmpty(email.toString())) {
      return {
        email: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    const invalidEmailAddressMessage =
      i18n.email.validation.invalidEmailAddress[i18n.languageCode];

    if (email && !validator.isLength(email.toString(), { min: 7, max: 350 })) {
      validated.messages.push(invalidEmailAddressMessage);
    }

    if (email && !validator.isEmail(email.toString())) {
      if (!validated.messages.includes(invalidEmailAddressMessage)) {
        validated.messages.push(invalidEmailAddressMessage);
      }
    }

    return {
      email: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (email && email.toString()) || "",
      },
    };
  },
};
