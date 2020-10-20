const { validatePackageDescription } = require("./package-description");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/package-description`, () => {
  const testCases = (languageCode) => [
    [
      "missing field is allowed",
      undefined,
      {
        packageDescription: {
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
        packageDescription: {
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
        packageDescription: {
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
        packageDescription: {
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
        packageDescription: {
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
        packageDescription: {
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

        expect(validatePackageDescription(given, i18n)).toEqual(expected);
      }
    );
  });
});
