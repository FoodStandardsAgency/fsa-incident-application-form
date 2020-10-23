const { camelToKebab } = require("../camel-to-kebab");

module.exports = {
  getErrorSummaryFromValidation: (
    validation,
    errorSummary = [],
    prefix = ""
  ) => {
    Object.keys(validation.validatedFields).forEach((validatedField) => {
      if (!validation.validatedFields[validatedField].messages) {
        return module.exports.getErrorSummaryFromValidation(
          {
            validatedFields: validation.validatedFields[validatedField],
          },
          errorSummary,
          camelToKebab(validatedField)
        );
      }

      const { messages } = validation.validatedFields[validatedField];

      if (!messages || messages.length === 0) {
        return false;
      }

      messages.forEach((message) => {
        errorSummary.push({
          text: message,
          href: `#${prefix && `${prefix}.`}${camelToKebab(validatedField)}`,
        });
      });
    });

    return errorSummary;
  },
};
