const { validateBatchCodes } = require("./batch-codes");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/batch-codes`, () => {
  const testCases = (languageCode) => [
    [
      "missing field is allowed",
      undefined,
      {
        batchCodes: {
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
        batchCodes: {
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
        batchCodes: {
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
        batchCodes: {
          isValid: true,
          messages: [],
          value: "6665",
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        batchCodes: {
          isValid: true,
          messages: [],
          value: "&lt;script&gt;tag here&lt;&#x2F;script&gt;",
        },
      },
    ],
    [
      "happy path",
      `
      first batch code
      second batch code
      `,
      {
        batchCodes: {
          isValid: true,
          messages: [],
          value: `first batch code
      second batch code`,
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

        expect(validateBatchCodes(given, i18n)).toEqual(expected);
      }
    );
  });
});
