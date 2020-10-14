const {
  validateLocalAuthorityNotified,
} = require("./local-authority-notified");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/local-authority-notified`, () => {
  const testCases = () => [
    [
      "missing field",
      undefined,
      {
        localAuthorityNotified: {
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
        localAuthorityNotified: {
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
        localAuthorityNotified: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        localAuthorityNotified: {
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
        localAuthorityNotified: {
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

        expect(validateLocalAuthorityNotified(given, i18n)).toEqual(expected);
      }
    );
  });
});
