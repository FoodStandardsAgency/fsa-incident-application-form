const { validateTelephone1 } = require("./telephone1");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/telephone1`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
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
      false,
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
      "",
      {
        telephone1: {
          isValid: false,
          messages: [translations.telephone1.validation.required[languageCode]],
          value: "",
        },
      },
    ],
    [
      "value is too long",
      "1".repeat(61),
      {
        telephone1: {
          isValid: false,
          messages: [translations.telephone1.validation.invalid[languageCode]],
          value: "1".repeat(61),
        },
      },
    ],
    [
      "only valid characters",
      "text is not 01998 123 456 <script>cheeky</script>allowed",
      {
        telephone1: {
          isValid: false,
          messages: [translations.telephone1.validation.invalid[languageCode]],
          value:
            "text is not 01998 123 456 &lt;script&gt;cheeky&lt;&#x2F;script&gt;allowed",
        },
      },
    ],
    [
      "international format",
      "+44 1234 567 890",
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
      "01234 567 098",
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
      (description, given, expected) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        expect(validateTelephone1(given, i18n)).toEqual(expected);
      }
    );
  });
});
