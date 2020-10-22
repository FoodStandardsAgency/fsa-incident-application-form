const { validateCompanyType } = require("./company-type");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/company-type`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        companyType: {
          isValid: false,
          messages: [
            translations.companyType.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        companyType: {
          isValid: false,
          messages: [
            translations.companyType.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "provided field is empty",
      "",
      {
        companyType: {
          isValid: false,
          messages: [
            translations.companyType.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "using the default value",
      "0",
      {
        companyType: {
          isValid: false,
          messages: [
            translations.companyType.validation.required[languageCode],
          ],
          value: "0",
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        companyType: {
          isValid: true,
          messages: [],
          value: "&lt;script&gt;tag here&lt;&#x2F;script&gt;",
        },
      },
    ],
    [
      "happy path",
      "valid",
      {
        companyType: {
          isValid: true,
          messages: [],
          value: "valid",
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

        expect(validateCompanyType(given, i18n)).toEqual(expected);
      }
    );
  });
});
