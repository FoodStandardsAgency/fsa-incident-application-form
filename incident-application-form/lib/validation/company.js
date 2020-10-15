const { allValid } = require("./all-valid");
const { validateCompanyName } = require("./individual-fields/company-name");

module.exports = {
  validate: ({ companyName }, i18n) => {
    const validatedCompanyName = validateCompanyName(companyName, i18n);

    const isValid = allValid([validatedCompanyName]);

    return {
      isValid,
      validatedFields: {
        ...validatedCompanyName,
      },
    };
  },
};
