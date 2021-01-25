const { validateBrand } = require("./brand");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/brand`, () => {
  const testCases = (languageCode) => [
    [
      "missing field is allowed",
      undefined,
      {
        brand: {
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
        brand: {
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
        brand: {
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
        brand: {
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
        brand: {
          isValid: false,
          messages: [translations.brand.validation.invalidLength[languageCode]],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "ensure input values are not escaped - https://trello.com/c/pBU5DhFV",
      "<script>tag here</script>",
      {
        brand: {
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
        brand: {
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

        expect(validateBrand(given, i18n)).toEqual(expected);
      }
    );
  });
});
