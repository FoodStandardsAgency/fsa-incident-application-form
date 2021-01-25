const validator = require("validator");

module.exports = {
  validateNatureOfProblem: (natureOfProblem, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (!natureOfProblem || validator.isEmpty(natureOfProblem)) {
      validated.messages.push(
        i18n.natureOfProblem.validation.required[i18n.languageCode]
      );
    }

    return {
      natureOfProblem: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (natureOfProblem && natureOfProblem.toString()) || "",
      },
    };
  },
};
