const { validateContactName } = require("./contact-name");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/contact-name`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      {
        input: undefined,
        options: {},
      },
      {
        contactName: {
          isValid: false,
          messages: [
            translations.contactName.validation.required[languageCode],
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
        contactName: {
          isValid: false,
          messages: [
            translations.contactName.validation.required[languageCode],
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
        contactName: {
          isValid: false,
          messages: [
            translations.contactName.validation.required[languageCode],
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
        contactName: {
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
        contactName: {
          isValid: false,
          messages: [
            translations.contactName.validation.invalidLength[languageCode],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "ensure input values are not escaped - https://trello.com/c/pBU5DhFV",
      {
        input: "<script>tag here</script>",
        options: {
          required: false,
        },
      },
      {
        contactName: {
          isValid: true,
          messages: [],
          value: "<script>tag here</script>",
        },
      },
    ],
    [
      "happy path",
      {
        input: "valid",
        options: {},
      },
      {
        contactName: {
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

        expect(validateContactName(input, i18n, options)).toEqual(expected);
      }
    );
  });
});
