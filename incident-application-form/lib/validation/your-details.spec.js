const { validate } = require("../validation/your-details");

const translations = require(`${__dirname}/../../translations/your-details.json`);

describe(`lib/validation/your-details`, () => {
  const testCases = (languageCode) => [
    [
      "missing all fields",
      {},
      {
        isValid: false,
        validatedFields: {
          contactName: {
            isValid: false,
            messages: [
              translations.contactName.validation.required[languageCode],
            ],
            value: "",
          },
          notifierType: {
            isValid: false,
            messages: [
              translations.notifierType.validation.required[languageCode],
            ],
            value: "",
          },
        },
      },
    ],
    [
      "provided fields are empty",
      {
        contactName: "",
        notifierType: "",
      },
      {
        isValid: false,
        validatedFields: {
          contactName: {
            isValid: false,
            messages: [
              translations.contactName.validation.required[languageCode],
            ],
            value: "",
          },
          notifierType: {
            isValid: false,
            messages: [
              translations.notifierType.validation.required[languageCode],
            ],
            value: "",
          },
        },
      },
    ],
    [
      "contact name is too long",
      {
        contactName: "a".repeat(101),
        notifierType: "valid",
      },
      {
        isValid: false,
        validatedFields: {
          contactName: {
            isValid: false,
            messages: [
              translations.contactName.validation.invalidLength[languageCode],
            ],
            value: "a".repeat(101),
          },
          notifierType: {
            isValid: true,
            messages: [],
            value: "valid",
          },
        },
      },
    ],
    [
      "values are escaped",
      {
        contactName: "<script>tag here</script>",
        notifierType: "flowers+%3Cscript%3Eevil_script()%3C/script%3E",
      },
      {
        isValid: true,
        validatedFields: {
          contactName: {
            isValid: true,
            messages: [],
            value: "&lt;script&gt;tag here&lt;&#x2F;script&gt;",
          },
          notifierType: {
            isValid: true,
            messages: [],
            value: "flowers+%3Cscript%3Eevil_script()%3C&#x2F;script%3E",
          },
        },
      },
    ],
    [
      "happy path",
      {
        contactName: "valid",
        notifierType: "valid",
      },
      {
        isValid: true,
        validatedFields: {
          contactName: {
            isValid: true,
            messages: [],
            value: "valid",
          },
          notifierType: {
            isValid: true,
            messages: [],
            value: "valid",
          },
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

        expect(validate(given, i18n)).toEqual(expected);
      }
    );
  });
});
