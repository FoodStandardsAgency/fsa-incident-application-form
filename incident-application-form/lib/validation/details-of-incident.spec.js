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
      true,
    ],
    [
      "not every field is required",
      {
        incidentTitle: "valid",
        natureOfProblem: "valid",
        actionTaken: "",
        distributionDetails: "",
        localAuthorityNotified: "",
      },
      true,
      false,
    ],
    [
      "happiest path",
      {
        incidentTitle: "valid",
        natureOfProblem: "valid",
        actionTaken: "",
        distributionDetails: "",
        localAuthorityNotified: "",
        illnessDetails: "valid",
        additionalInformation: "valid",
      },
      true,
      false,
    ],
  ];

  ["en", "cy"].forEach((languageCode) => {
    test.each(testCases(languageCode))(
      `%s - ${languageCode}`,
      (description, given, expectedIsValidOutcome, expectedIsEmptyOutcome) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        const outcome = validate(given, i18n);

        expect(outcome.isValid).toEqual(expectedIsValidOutcome);
        expect(outcome.isEmpty).toEqual(expectedIsEmptyOutcome);
      }
    );
  });
});
