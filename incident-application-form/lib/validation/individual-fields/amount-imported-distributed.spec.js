const {
  validateAmountImportedDistributed,
} = require("./amount-imported-distributed");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/amount-imported-distributed`, () => {
  const testCases = (languageCode) => [
    [
      "missing field is allowed",
      undefined,
      {
        amountImportedDistributed: {
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
        amountImportedDistributed: {
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
        amountImportedDistributed: {
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
        amountImportedDistributed: {
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
        amountImportedDistributed: {
          isValid: false,
          messages: [
            translations.amountImportedDistributed.validation.invalidLength[
              languageCode
            ],
            translations.amountImportedDistributed.validation.invalidNumber[
              languageCode
            ],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "happy path",
      "12345",
      {
        amountImportedDistributed: {
          isValid: true,
          messages: [],
          value: "12345",
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

        expect(validateAmountImportedDistributed(given, i18n)).toEqual(
          expected
        );
      }
    );
  });
});
