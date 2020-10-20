const { validate } = require("./product");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/product`, () => {
  const testCases = () => [
    [
      "invalid",
      {
        companyName: "",
        brand: "",
      },
      false,
    ],
    [
      "not every field is required",
      {
        productName: "valid",
        // brand: "valid",
        originCountry: "17",
      },
      true,
    ],
    [
      "happiest path",
      {
        productName: "valid",
        brand: "valid",
        companies: {
          "123-abc": {
            name: "valid",
          },
        },
        originCountry: "17",
      },
      true,
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

        expect(validate(given, i18n).isValid).toEqual(expected);
      }
    );
  });
});
