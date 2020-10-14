const { validateAddressCounty } = require("../validation/address.county");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/address.county`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        county: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        county: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "provided field is empty",
      "",
      {
        county: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "value is too long",
      "a".repeat(256),
      {
        county: {
          isValid: false,
          messages: [
            translations.address.county.validation.invalidLength[languageCode],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        county: {
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
        county: {
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

        expect(validateAddressCounty(given, i18n)).toEqual(expected);
      }
    );
  });
});
