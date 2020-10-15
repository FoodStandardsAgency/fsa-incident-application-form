const { validateAddressTown } = require("./address.town");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/address.town`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        town: {
          isValid: false,
          messages: [
            translations.address.town.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        town: {
          isValid: false,
          messages: [
            translations.address.town.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "provided field is empty",
      "",
      {
        town: {
          isValid: false,
          messages: [
            translations.address.town.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "value is too long",
      "a".repeat(256),
      {
        town: {
          isValid: false,
          messages: [
            translations.address.town.validation.invalidLength[languageCode],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        town: {
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
        town: {
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

        expect(validateAddressTown(given, i18n)).toEqual(expected);
      }
    );
  });
});
