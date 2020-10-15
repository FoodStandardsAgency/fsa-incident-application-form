const { validateProductName } = require("./product-name");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/product-name`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        productName: {
          isValid: false,
          messages: [
            translations.productName.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        productName: {
          isValid: false,
          messages: [
            translations.productName.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "provided field is empty",
      "",
      {
        productName: {
          isValid: false,
          messages: [
            translations.productName.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "value is too long",
      "a".repeat(256),
      {
        productName: {
          isValid: false,
          messages: [
            translations.productName.validation.invalidLength[languageCode],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        productName: {
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
        productName: {
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

        expect(validateProductName(given, i18n)).toEqual(expected);
      }
    );
  });
});
