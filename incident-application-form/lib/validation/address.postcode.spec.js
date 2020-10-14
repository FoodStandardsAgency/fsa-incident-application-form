const { validateAddressPostcode } = require("../validation/address.postcode");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/address.postcode`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        postcode: {
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
        postcode: {
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
        postcode: {
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
        postcode: {
          isValid: false,
          messages: [
            translations.address.postcode.validation.invalid[languageCode],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "happy path",
      "TY1 1TY",
      {
        postcode: {
          isValid: true,
          messages: [],
          value: "TY1 1TY",
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

        expect(validateAddressPostcode(given, i18n)).toEqual(expected);
      }
    );
  });
});
