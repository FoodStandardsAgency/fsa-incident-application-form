const { validateEmail } = require("./email");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/email`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        email: {
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
        email: {
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
        email: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "value is too long",
      `${"a".repeat(100)}@${"b".repeat(500)}.com`,
      {
        email: {
          isValid: false,
          messages: [
            translations.email.validation.invalidEmailAddress[languageCode],
          ],
          value: `${"a".repeat(100)}@${"b".repeat(500)}.com`,
        },
      },
    ],
    [
      "value is not an email address",
      "abcdefg",
      {
        email: {
          isValid: false,
          messages: [
            translations.email.validation.invalidEmailAddress[languageCode],
          ],
          value: "abcdefg",
        },
      },
    ],
    [
      "happy path",
      "a@b.com",
      {
        email: {
          isValid: true,
          messages: [],
          value: "a@b.com",
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

        expect(validateEmail(given, i18n)).toEqual(expected);
      }
    );
  });
});
