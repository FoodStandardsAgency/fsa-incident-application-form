const validator = require("validator");

module.exports = {
  validateOrganisation: (organisation, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!organisation || validator.isEmpty(organisation.toString())) {
      return {
        organisation: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    if (
      organisation &&
      !validator.isLength(organisation.toString(), { min: 1, max: 255 })
    ) {
      validated.messages.push(
        i18n.organisation.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      organisation: {
        ...validated,
        isValid: validated.messages.length === 0,
        value:
          (organisation && validator.escape(organisation.toString())) || "",
      },
    };
  },
};
