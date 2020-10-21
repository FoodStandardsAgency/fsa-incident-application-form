const { camelToKebab } = require("../camel-to-kebab");

module.exports = {
  getErrorSummaryFromValidation: (validation) => {
    const errorSummary = [];

    Object.keys(validation.validatedFields).forEach((validatedField) => {
      const { messages } = validation.validatedFields[validatedField];

      if (!messages || messages.length === 0) {
        return false;
      }

      messages.forEach((message) => {
        errorSummary.push({
          text: message,
          href: `#${camelToKebab(validatedField)}`,
        });
      });
    });

    return errorSummary;
  },
};
