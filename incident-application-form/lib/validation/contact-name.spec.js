const { validateContactName } = require("../validation/contact-name");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/contact-name`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        contactName: {
          isValid: false,
          messages: [
            translations.contactName.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        contactName: {
          isValid: false,
          messages: [
            translations.contactName.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "provided field is empty",
      "",
      {
        contactName: {
          isValid: false,
          messages: [
            translations.contactName.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "value is too long",
      "a".repeat(256),
      {
        contactName: {
          isValid: false,
          messages: [
            translations.contactName.validation.invalidLength[languageCode],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        contactName: {
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
        contactName: {
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

        expect(validateContactName(given, i18n)).toEqual(expected);
      }
    );
  });
});
