const { validatePackUnitType } = require("./pack-unit-type");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/pack-unit-type`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        packUnitType: {
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
        packUnitType: {
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
        packUnitType: {
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
        packUnitType: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "ensure input values are not escaped - https://trello.com/c/pBU5DhFV",
      "<script>tag here</script>",
      {
        packUnitType: {
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
        packUnitType: {
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

        expect(validatePackUnitType(given, i18n)).toEqual(expected);
      }
    );
  });
});
