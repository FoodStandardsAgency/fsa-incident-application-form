const { validateCompanies } = require("./companies");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/companies`, () => {
  const testCases = (languageCode) => [
    [
      "object cannot be empty",
      {},
      {
        companies: {
          isValid: false,
          messages: [
            translations.companies.validation.invalidLength[languageCode],
          ],
          value: {},
        },
      },
    ],
    [
      "happy path - one company",
      {
        "abc-def": {},
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
        "abc-def": {},
        "123-xyz": {},
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
      (description, given, expected) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        expect(validateCompanies(given, i18n)).toEqual(expected);
      }
    );
  });
});
