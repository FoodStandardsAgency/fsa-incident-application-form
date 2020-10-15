const { validate } = require("../validation/details-of-incident");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/details-of-incident`, () => {
  const testCases = () => [
    [
      "invalid",
      {
        natureOfProblem: "",
        actionTaken: "",
      },
      false,
    ],
    [
      "not every field is required",
      {
        natureOfProblem: "valid",
        actionTaken: "",
        distributionDetails: "",
        localAuthorityNotified: "",
      },
      true,
    ],
    [
      "happiest path",
      {
        natureOfProblem: "valid",
        actionTaken: "",
        distributionDetails: "",
        localAuthorityNotified: "",
        illnessDetails: "valid",
        additionalInformation: "valid",
      },
      true,
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

        expect(validate(given, i18n).isValid).toEqual(expected);
      }
    );
  });
});
