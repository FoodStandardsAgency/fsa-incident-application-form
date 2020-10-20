const { validateUnitType } = require("./unit-type");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/unit-type`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        unitType: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        unitType: {
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
        unitType: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "using the default value",
      "0",
      {
        unitType: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        unitType: {
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
        unitType: {
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

        expect(validateUnitType(given, i18n)).toEqual(expected);
      }
    );
  });
});
