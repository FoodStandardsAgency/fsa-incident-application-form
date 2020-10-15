const { validate } = require("../validation/your-details");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/your-details`, () => {
  const testCases = (languageCode) => [
    [
      "invalid path",
      {
        contactName: "valid",
        notifierType: "valid",
        position: "valid",
        organisation: "valid",
        email: "not a valid email address dot wot",
        telephone1: "phone numbers are not text",
        addressLine1: "valid",
        addressLine2: "valid",
        addressTown: "valid",
        addressCounty: "valid",
        addressPostcode: "TE1 5ST",
        addressCountry: "valid",
      },
      false,
    ],
    [
      "happy path",
      {
        contactName: "valid",
        notifierType: "valid",
        position: "valid",
        organisation: "valid",
        email: "a@b.com",
        telephone1: "+44 1234 567890",
        addressLine1: "valid",
        addressLine2: "valid",
        addressTown: "valid",
        addressCounty: "valid",
        addressPostcode: "TE1 5ST",
        addressCountry: "valid",
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
