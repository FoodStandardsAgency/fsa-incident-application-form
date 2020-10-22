const defaultOptions = {
  required: true,
};

module.exports = {
  validateCompanies: (companies, i18n, options) => {
    let validated = {
      isValid: false,
      messages: [],
      value: {},
    };

    let resolvedOptions = {
      ...defaultOptions,
      ...options,
    };

    if (
      (!companies ||
        companies.constructor !== Object ||
        Object.entries(companies).length === 0) &&
      resolvedOptions.required
    ) {
      return {
        companies: {
          ...validated,
          messages: [i18n.companies.validation.required[i18n.languageCode]],
          value: companies || {},
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
