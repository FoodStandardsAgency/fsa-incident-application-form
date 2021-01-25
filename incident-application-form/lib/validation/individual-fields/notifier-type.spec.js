const { validateNotifierType } = require("./notifier-type");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/notifier-type`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        notifierType: {
          isValid: false,
          messages: [
            translations.notifierType.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        notifierType: {
          isValid: false,
          messages: [
            translations.notifierType.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "provided field is empty",
      "",
      {
        notifierType: {
          isValid: false,
          messages: [
            translations.notifierType.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "using the default value",
      "0",
      {
        notifierType: {
          isValid: false,
          messages: [
            translations.notifierType.validation.required[languageCode],
          ],
          value: "0",
        },
      },
    ],
    [
      "ensure input values are not escaped - https://trello.com/c/pBU5DhFV",
      "<script>tag here</script>",
      {
        notifierType: {
          isValid: true,
          messages: [],
          value: "<script>tag here</script>",
        },
      },
    ],
    [
      "happy path",
      "valid",
      {
        notifierType: {
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
      (description, given, expected) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        expect(validateNotifierType(given, i18n)).toEqual(expected);
      }
    );
  });
});
