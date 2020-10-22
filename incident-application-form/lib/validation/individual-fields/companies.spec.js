const { validateCompanies } = require("./companies");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/companies`, () => {
  const testCases = (languageCode) => [
    [
      "object cannot be empty",
      {
        input: undefined,
        options: {},
      },
      {
        companies: {
          isValid: false,
          messages: [translations.companies.validation.required[languageCode]],
          value: {},
        },
      },
    ],
    [
      "valid if empty and not required",
      {
        input: {},
        options: {
          required: false,
        },
      },
      {
        companies: {
          isValid: true,
          messages: [],
          value: {},
        },
      },
    ],
    [
      "happy path - one company",
      {
        input: {
          "abc-def": {},
        },
        options: {},
      },
      {
        companies: {
          isValid: true,
          messages: [],
          value: {
            "abc-def": {},
          },
        },
      },
    ],
    [
      "happy path - multiple companies",
      {
        input: {
          "abc-def": {},
          "123-xyz": {},
        },

        options: {},
      },
      {
        companies: {
          isValid: true,
          messages: [],
          value: {
            "123-xyz": {},
            "abc-def": {},
          },
        },
      },
    ],
  ];

  ["en", "cy"].forEach((languageCode) => {
    test.each(testCases(languageCode))(
      `%s - ${languageCode}`,
      (description, { input, options }, expected) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        expect(validateCompanies(input, i18n, options)).toEqual(expected);
      }
    );
  });
});
