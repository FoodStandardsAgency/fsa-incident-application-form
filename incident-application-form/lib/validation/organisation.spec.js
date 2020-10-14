const { validateOrganisation } = require("../validation/organisation");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/organisation`, () => {
  const testCases = (languageCode) => [
    [
      "missing field is allowed",
      undefined,
      {
        organisation: {
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
        organisation: {
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
        organisation: {
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
        organisation: {
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
        organisation: {
          isValid: false,
          messages: [
            translations.organisation.validation.invalidLength[languageCode],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        organisation: {
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
        organisation: {
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

        expect(validateOrganisation(given, i18n)).toEqual(expected);
      }
    );
  });
});
