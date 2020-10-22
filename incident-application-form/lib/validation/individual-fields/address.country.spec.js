const { validateAddressCountry } = require("./address.country");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/address.country`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      {
        input: undefined,
        options: {},
      },
      {
        country: {
          isValid: false,
          messages: [
            translations.address.country.validation.required[languageCode],
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
        country: {
          isValid: false,
          messages: [
            translations.address.country.validation.required[languageCode],
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
        country: {
          isValid: false,
          messages: [
            translations.address.country.validation.required[languageCode],
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
        country: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "using the default value",
      {
        input: "0",
        options: undefined,
      },
      {
        country: {
          isValid: false,
          messages: [
            translations.address.country.validation.required[languageCode],
          ],
          value: "0",
        },
      },
    ],
    [
      "using the default value is valid when not required",
      {
        input: "0",
        options: {
          required: false,
        },
      },
      {
        country: {
          isValid: true,
          messages: [],
          value: "0",
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
        country: {
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
        country: {
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

        expect(validateAddressCountry(input, i18n, options)).toEqual(expected);
      }
    );
  });
});
