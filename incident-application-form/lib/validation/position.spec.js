const { validatePosition } = require("../validation/position");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/position`, () => {
  const testCases = (languageCode) => [
    [
      "missing field is allowed",
      undefined,
      {
        position: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "wrong data type returns an empty string",
      false,
      {
        position: {
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
        position: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "given a number returns a string",
      6665,
      {
        position: {
          isValid: true,
          messages: [],
          value: "6665",
        },
      },
    ],
    [
      "is too long",
      "a".repeat(256),
      {
        position: {
          isValid: false,
          messages: [
            translations.position.validation.invalidLength[languageCode],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        position: {
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
        position: {
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

        expect(validatePosition(given, i18n)).toEqual(expected);
      }
    );
  });
});
