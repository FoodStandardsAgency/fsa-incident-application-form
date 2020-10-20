const { assemblePayload } = require("./final-payload-assembly");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

const {
  validate: validateYourDetails,
} = require("../../lib/validation/your-details");
const {
  validate: validateDetailsOfIncident,
} = require("../../lib/validation/details-of-incident");
const { validate: validateCompany } = require("../../lib/validation/company");
const { validate: validateProduct } = require("../../lib/validation/product");

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

const detailsOfIncident = {
  incidentTitle: "My incident title",
  natureOfProblem: "The nature of my problem is ...",
  actionTaken: "I took the following actions ...",
  distributionDetails: "This was distributed too ...",
  illnessDetails: "People were ill with ...",
  localAuthorityNotified: "I notified the following ...",
  additionalInformation: "Here is some additional info ...",
};

const validatedYourDetails = validateYourDetails(yourDetails, i18n);
const validatedDetailsOfIncident = validateDetailsOfIncident(
  detailsOfIncident,
  i18n
);

const mockCompany1 = {
  companyName: "Testco",
};

const mockCompany2 = {
  companyName: "Another testing company Ltd.",
};

const mockCompany3 = {
  companyName: "Large Testers PLC",
};

const validatedCompany1 = validateCompany(mockCompany1);
const validatedCompany2 = validateCompany(mockCompany2);
const validatedCompany3 = validateCompany(mockCompany3);

const mockProduct1 = {
  productName: "A test product name",
  brand: "Test brand",
  companies: {
    "aaa-bbb-ccc-ddd": validatedCompany1.validatedFields,
    "zzz-xxx-ccc-vvv-bbb": validatedCompany2.validatedFields,
  },
};

const mockProduct2 = {
  productName: "Another test product",
  brand: "Another brand",
  companies: {
    "999-111-888-222": validatedCompany3.validatedFields,
  },
};

const validatedProduct1 = validateProduct(mockProduct1);
const validatedProduct2 = validateProduct(mockProduct2);

describe(`lib/formatting/final-payload-assembly`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    [
      "happy path",
      {
        yourDetails: validatedYourDetails.validatedFields,
        detailsOfIncident: validatedDetailsOfIncident.validatedFields,
        products: {
          "abc-123-def-456": validatedProduct1.validatedFields,
          "xyz-987-uvw-654": validatedProduct2.validatedFields,
        },
      },
      {
        Addresses: {
          AddressLine1: yourDetails.addressLine1,
          AddressLine2: yourDetails.addressLine2,
          TownCity: yourDetails.addressTown,
          County: yourDetails.addressCounty,
          Postcode: yourDetails.addressPostcode,
          CountryID: parseInt(yourDetails.addressCountry, 10),
        },
        Incidents: {
          NotifierID: parseInt(yourDetails.notifierType, 10),
          NatureOfProblem: detailsOfIncident.natureOfProblem,
          ActionTaken: detailsOfIncident.actionTaken,
          DistributionDetails: detailsOfIncident.distributionDetails,
          IllnessDetails: detailsOfIncident.illnessDetails,
          LocalAuthorityNotified: detailsOfIncident.localAuthorityNotified,
          AdditionalInformation: detailsOfIncident.additionalInformation,
        },
        IncidentProducts: [
          {
            Name: mockProduct1.productName,
            Brand: mockProduct1.brand,
            Companies: [
              { Name: mockCompany1.companyName },
              { Name: mockCompany2.companyName },
            ],
          },
          {
            Name: mockProduct2.productName,
            Brand: mockProduct2.brand,
            Companies: [{ Name: mockCompany3.companyName }],
          },
        ],
        IncidentStakeholders: {
          Name: yourDetails.contactName,
          Role: yourDetails.position,
          GovDept: yourDetails.organisation,
          Email: yourDetails.email,
          Phone: yourDetails.telephone1,
        },
      },
    ],
  ];

  xtest.each(testCases)(`%s`, (description, given, expected) => {
    expect(assemblePayload(given)).toEqual(expected);
  });
});
