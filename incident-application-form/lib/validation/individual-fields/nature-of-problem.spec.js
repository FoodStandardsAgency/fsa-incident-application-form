const { validateNatureOfProblem } = require("./nature-of-problem");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/nature-of-problem`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        natureOfProblem: {
          isValid: false,
          messages: [
            translations.natureOfProblem.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        natureOfProblem: {
          isValid: false,
          messages: [
            translations.natureOfProblem.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "provided field is empty",
      "",
      {
        natureOfProblem: {
          isValid: false,
          messages: [
            translations.natureOfProblem.validation.required[languageCode],
          ],
          value: "",
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        natureOfProblem: {
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
        natureOfProblem: {
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

        expect(validateNatureOfProblem(given, i18n)).toEqual(expected);
      }
    );
  });
});
