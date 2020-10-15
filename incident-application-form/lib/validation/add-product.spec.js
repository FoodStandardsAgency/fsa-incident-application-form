const { validate } = require("../validation/add-product");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/add-product`, () => {
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
      },
      true,
    ],
    [
      "happiest path",
      {
        productName: "valid",
        brand: "valid",
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
