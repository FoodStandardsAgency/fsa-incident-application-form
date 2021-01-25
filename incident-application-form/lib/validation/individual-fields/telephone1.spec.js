const { validateTelephone1 } = require("./telephone1");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/telephone1`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      {
        input: undefined,
        options: {},
      },
      {
        telephone1: {
          isValid: false,
          messages: [translations.telephone1.validation.required[languageCode]],
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
        telephone1: {
          isValid: false,
          messages: [translations.telephone1.validation.required[languageCode]],
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
        telephone1: {
          isValid: false,
          messages: [translations.telephone1.validation.required[languageCode]],
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
        telephone1: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "value is too long",
      {
        input: "1".repeat(61),
        options: {},
      },
      {
        telephone1: {
          isValid: false,
          messages: [translations.telephone1.validation.invalid[languageCode]],
          value: "1".repeat(61),
        },
      },
    ],
    [
      "only valid characters - no escaping https://trello.com/c/pBU5DhFV",
      {
        input: "text is not 01998 123 456 <script>cheeky</script>allowed",
        options: {},
      },
      {
        telephone1: {
          isValid: false,
          messages: [translations.telephone1.validation.invalid[languageCode]],
          value: "text is not 01998 123 456 <script>cheeky</script>allowed",
        },
      },
    ],
    [
      "international format",
      {
        input: "+44 1234 567 890",
        options: {
          required: true,
        },
      },
      {
        telephone1: {
          isValid: true,
          messages: [],
          value: "+44 1234 567 890",
        },
      },
    ],
    [
      "happy path",
      {
        input: "01234 567 098",
        options: {},
      },
      {
        telephone1: {
          isValid: true,
          messages: [],
          value: "01234 567 098",
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

        expect(validateTelephone1(input, i18n, options)).toEqual(expected);
      }
    );
  });
});
