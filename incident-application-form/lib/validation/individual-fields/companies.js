module.exports = {
  validateCompanies: (companies, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: {},
    };

    if (
      !companies ||
      companies.constructor !== Object ||
      Object.entries(companies).length === 0
    ) {
      return {
        companies: {
          ...validated,
          messages: [
            i18n.companies.validation.invalidLength[i18n.languageCode],
          ],
          value: companies,
        },
      };
    }

    return {
      companies: {
        ...validated,
        isValid: true,
        value: companies,
      },
    };
  },
};
