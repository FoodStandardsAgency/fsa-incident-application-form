const { validate } = require("../validation/your-details");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/your-details`, () => {
  const testCases = (languageCode) => [
    [
      "all empty",
      {
        contactName: "",
        notifierType: "",
        position: "",
        organisation: "",
        email: "",
        telephone1: "",
        addressLine1: "",
        addressLine2: "",
        addressTown: "",
        addressCounty: "",
        addressPostcode: "",
        addressCountry: "",
      },
      false,
      true,
    ],
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
      false,
    ],
  ];

  ["en", "cy"].forEach((languageCode) => {
    test.each(testCases(languageCode))(
      `%s - ${languageCode}`,
      (description, given, expectedIsValidOutcome, expectedIsEmptyOutcome) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        const outcome = validate(given, i18n);

        expect(outcome.isValid).toEqual(expectedIsValidOutcome);
        expect(outcome.isEmpty).toEqual(expectedIsEmptyOutcome);
      }
    );
  });
});
