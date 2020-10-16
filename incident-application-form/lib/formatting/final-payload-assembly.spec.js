const { assemblePayload } = require("./final-payload-assembly");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

const {
  validate: validateYourDetails,
} = require("../../lib/validation/your-details");

const i18n = {
  languageCode: "en",
  ...translations,
};

const yourDetails = {
  notifierType: "3",
  contactName: "Timmy Testfield",
  position: "Chief Tester",
  organisation: "Testco Ltd.",
  email: "timmy@testfield.com",
  telephone1: "+44 1234 567 890",
  addressLine1: "1 Test Street",
  addressLine2: "Test Lane",
  addressTown: "Test Town",
  addressCounty: "County Test",
  addressPostcode: "TE1 5ST",
  addressCountry: "17",
};

const validatedYourDetails = validateYourDetails(yourDetails, i18n);

describe(`lib/formatting/final-payload-assembly`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    [
      "happy path",
      { yourDetails: validatedYourDetails.validatedFields },
      {
        Incidents: {
          NotifierID: parseInt(yourDetails.notifierType, 10),
        },
        IncidentStakeholders: {
          Name: yourDetails.contactName,
          Role: yourDetails.position,
          GovDept: yourDetails.organisation,
          Email: yourDetails.email,
          Phone: yourDetails.telephone1,
        },
        Addresses: {
          AddressLine1: yourDetails.addressLine1,
          AddressLine2: yourDetails.addressLine2,
          TownCity: yourDetails.addressTown,
          County: yourDetails.addressCounty,
          Postcode: yourDetails.addressPostcode,
          CountryID: parseInt(yourDetails.addressCountry, 10),
        },
      },
    ],
  ];

  test.each(testCases)(`%s`, (description, given, expected) => {
    expect(assemblePayload(given)).toEqual(expected);
  });
});
