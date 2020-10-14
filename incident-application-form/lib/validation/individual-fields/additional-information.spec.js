const { validateAdditionalInformation } = require("./additional-information");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/additional-information`, () => {
  const testCases = () => [
    [
      "missing field",
      undefined,
      {
        additionalInformation: {
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
        additionalInformation: {
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
        additionalInformation: {
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
        additionalInformation: {
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
        additionalInformation: {
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

        expect(validateAdditionalInformation(given, i18n)).toEqual(expected);
      }
    );
  });
});
