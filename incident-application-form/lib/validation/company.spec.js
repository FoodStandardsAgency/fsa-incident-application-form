const { validate } = require("./company");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/company`, () => {
  const testCases = () => [
    // [
    //   "invalid",
    //   {
    //     companyName: "",
    //   },
    //   false,
    // ],
    // [
    //   "not every field is required",
    //   {
    //     companyName: "valid",
    //     // brand: "valid",
    //   },
    //   true,
    // ],
    [
      "happiest path",
      {
        companyName: "valid",
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
