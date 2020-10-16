const validator = require("validator");

module.exports = {
  validateIncidentTitle: (incidentTitle, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!incidentTitle || validator.isEmpty(incidentTitle)) {
      validated.messages.push(
        i18n.incidentTitle.validation.required[i18n.languageCode]
      );
    }

    if (
      incidentTitle &&
      !validator.isLength(incidentTitle.toString(), { min: 1, max: 255 })
    ) {
      validated.messages.push(
        i18n.incidentTitle.validation.invalidLength[i18n.languageCode]
      );
    }

    return {
      incidentTitle: {
        ...validated,
        isValid: validated.messages.length === 0,
        value:
          (incidentTitle && validator.escape(incidentTitle.toString())) || "",
      },
    };
  },
};
