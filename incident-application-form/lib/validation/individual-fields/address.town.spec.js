const { validateAddressTown } = require("./address.town");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/address.town`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      {
        input: undefined,
        options: {},
      },
      {
        town: {
          isValid: false,
          messages: [
            translations.address.town.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      {
        input: false,
        options: {},
      },
      {
        town: {
          isValid: false,
          messages: [
            translations.address.town.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "provided field is empty",
      {
        input: "",
        options: undefined,
      },
      {
        town: {
          isValid: false,
          messages: [
            translations.address.town.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "provided field is empty, but not required",
      {
        input: "",
        options: {
          required: false,
        },
      },
      {
        town: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "value is too long",
      {
        input: "a".repeat(256),
        options: {},
      },
      {
        town: {
          isValid: false,
          messages: [
            translations.address.town.validation.invalidLength[languageCode],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "ensure values are escaped",
      {
        input: "<script>tag here</script>",
        options: undefined,
      },
      {
        town: {
          isValid: true,
          messages: [],
          value: "&lt;script&gt;tag here&lt;&#x2F;script&gt;",
        },
      },
    ],
    [
      "happy path",
      {
        input: "valid",
        options: undefined,
      },
      {
        town: {
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
      (description, { input, options }, expected) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        expect(validateAddressTown(input, i18n, options)).toEqual(expected);
      }
    );
  });
});
