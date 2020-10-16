const { validateIncidentTitle } = require("./incident-title");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/incident-title`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        incidentTitle: {
          isValid: false,
          messages: [
            translations.incidentTitle.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        incidentTitle: {
          isValid: false,
          messages: [
            translations.incidentTitle.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "provided field is empty",
      "",
      {
        incidentTitle: {
          isValid: false,
          messages: [
            translations.incidentTitle.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "value is too long",
      "a".repeat(256),
      {
        incidentTitle: {
          isValid: false,
          messages: [
            translations.incidentTitle.validation.invalidLength[languageCode],
          ],
          value: "a".repeat(256),
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        incidentTitle: {
          isValid: true,
          messages: [],
          value: "&lt;script&gt;tag here&lt;&#x2F;script&gt;",
        },
      },
    ],
    [
      "happy path",
      "valid",
      {
        incidentTitle: {
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

        expect(validateIncidentTitle(given, i18n)).toEqual(expected);
      }
    );
  });
});
