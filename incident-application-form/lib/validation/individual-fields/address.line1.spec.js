const { validateAddressLine1 } = require("./address.line1");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/address.line1`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        line1: {
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
        line1: {
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
        line1: {
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
        line1: {
          isValid: false,
          messages: [
            translations.address.line1.validation.invalidLength[languageCode],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "ensure input values are not escaped - https://trello.com/c/pBU5DhFV",
      "<script>tag here</script>",
      {
        line1: {
          isValid: true,
          messages: [],
          value: "<script>tag here</script>",
        },
      },
    ],
    [
      "happy path",
      "valid",
      {
        line1: {
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

        expect(validateAddressLine1(given, i18n)).toEqual(expected);
      }
    );
  });
});
