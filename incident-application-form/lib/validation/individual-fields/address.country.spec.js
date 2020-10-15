const { validateAddressCountry } = require("./address.country");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/address.country`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        country: {
          isValid: false,
          messages: [
            translations.address.country.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        country: {
          isValid: false,
          messages: [
            translations.address.country.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "provided field is empty",
      "",
      {
        country: {
          isValid: false,
          messages: [
            translations.address.country.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "using the default value",
      "0",
      {
        country: {
          isValid: false,
          messages: [
            translations.address.country.validation.required[languageCode],
          ],
          value: "0",
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        country: {
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
        country: {
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

        expect(validateAddressCountry(given, i18n)).toEqual(expected);
      }
    );
  });
});
