const validator = require("validator");

module.exports = {
  validatePackageDescription: (packageDescription, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
    };

    if (
      !packageDescription ||
      validator.isEmpty(packageDescription.toString())
    ) {
      return {
        packageDescription: {
          ...validated,
          isValid: true,
          value: "",
        },
      };
    }

    return {
      packageDescription: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: (packageDescription && packageDescription.toString()) || "",
      },
    };
  },
};
