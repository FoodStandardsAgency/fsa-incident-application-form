const defaultOptions = {
  required: true,
};

module.exports = {
  validateCompanies: (companies, i18n, options) => {
    const isEmpty =
      !companies ||
      companies.constructor !== Object ||
      Object.entries(companies).length === 0;

    let validated = {
      isEmpty,
      isValid: false,
      messages: [],
      value: {},
    };

    let resolvedOptions = {
      ...defaultOptions,
      ...options,
    };

    if (isEmpty && resolvedOptions.required) {
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
