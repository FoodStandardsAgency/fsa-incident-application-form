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
  companyType: "3",
  contactName: "Peter Testman",
  email: "peter@example.com",
  telephone1: "+44 1992 123 456",
  addressLine1: "Test line 1",
  addressLine2: "Test line 2",
  addressTown: "Testtown",
  addressCounty: "Testshire",
  addressPostcode: "TE1 5ST",
  addressCountry: "17",
};

const mockCompany2 = {
  companyName: "Another testing company Ltd.",
  companyType: "2",
  contactName: "",
  email: "gary@Example.com",
  telephone1: "",
  addressLine1: "",
  addressLine2: "",
  addressTown: "",
  addressCounty: "",
  addressPostcode: "",
  addressCountry: "",
};

const mockCompany3 = {
  companyName: "Large Testers PLC",
  companyType: "1",
  contactName: "",
  email: "",
  telephone1: "",
  addressLine1: "",
  addressLine2: "",
  addressTown: "Testington",
  addressCounty: "",
  addressPostcode: "",
  addressCountry: "6",
};

const mockCompany4 = {
  companyName: "",
  companyType: "",
  contactName: "",
  email: "",
  telephone1: "",
  addressLine1: "",
  addressLine2: "",
  addressTown: "",
  addressCounty: "",
  addressPostcode: "",
  addressCountry: "",
};

const validatedCompany1 = validateCompany(mockCompany1, i18n);
const validatedCompany2 = validateCompany(mockCompany2, i18n);
const validatedCompany3 = validateCompany(mockCompany3, i18n);
const validatedCompany4 = validateCompany(mockCompany4, i18n);

const mockProduct1 = {
  additionalInformation: "extra info here",
  amountImportedDistributed: "987656789",
  batchCodes: `11-11-11
22-22-22
  333-333
  444-4444`,
  bestBefore: {
    day: "31",
    month: "12",
    year: "2015",
  },
  brand: "Test brand",
  companies: {
    "aaa-bbb-ccc-ddd": validatedCompany1.validatedFields,
    "zzz-xxx-ccc-vvv-bbb": validatedCompany2.validatedFields,
  },
  displayUntil: {
    day: "1",
    month: "2",
    year: "2023",
  },
  originCountry: "15",
  packSize: "44 units",
  packageDescription: "a big pack of things",
  productName: "A test product name",
  productType: "4",
  unitType: "2",
  useBy: {
    day: "19",
    month: "11",
    year: "2021",
  },
};

const mockProduct2 = {
  additionalInformation: "",
  amountImportedDistributed: "",
  batchCodes: "only-one-batch-code",
  bestBefore: {
    day: "",
    month: "",
    year: "",
  },
  brand: "Another brand",
  companies: {
    "999-111-888-222": validatedCompany3.validatedFields,
  },
  displayUntil: {
    day: "",
    month: "",
    year: "",
  },
  originCountry: "6",
  packSize: "",
  packageDescription: "",
  productName: "Another test product",
  productType: "",
  unitType: "4",
  useBy: {
    day: "7",
    month: "6",
    year: "2020",
  },
};

const mockProduct3 = {
  additionalInformation: "",
  amountImportedDistributed: "",
  batchCodes: "",
  bestBefore: {
    day: "",
    month: "",
    year: "",
  },
  brand: "",
  companies: {
    "pretty-much-empty-company-id": validatedCompany4.validatedFields,
  },
  displayUntil: {
    day: "",
    month: "",
    year: "",
  },
  originCountry: "",
  packSize: "",
  packageDescription: "",
  productName: "Another test product",
  productType: "",
  unitType: "",
  useBy: {
    day: "",
    month: "",
    year: "",
  },
};

const validatedProduct1 = validateProduct(mockProduct1, i18n);
const validatedProduct2 = validateProduct(mockProduct2, i18n);
const validatedProduct3 = validateProduct(mockProduct3, i18n);

describe(`lib/formatting/final-payload-assembly`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    [
      "minimum required",
      {
        yourDetails: validatedYourDetails.validatedFields,
        detailsOfIncident: validatedDetailsOfIncident.validatedFields,
        products: {
          // "abc-123-def-456": validatedProduct1.validatedFields,
          "xyz-987-uvw-654": validatedProduct3.validatedFields,
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
            AdditionalInfo: "",
            Amount: 0,
            AmountUnitTypeId: 0,
            BatchCodes: "",
            Brand: "",
            Companies: [
              {
                Addresses: {
                  AddressLine1: "",
                  AddressLine2: "",
                  TownCity: "",
                  County: "",
                  Postcode: "",
                  CountryID: 0,
                },
                Contact: {
                  Name: "",
                  EmailAddress: "",
                  TelephoneNumber: "",
                },
                FBOSTypes: 0,
                Name: "",
              },
            ],
            CountryOfOriginId: 0,
            IncidentProductDates: {
              BestBeforeDate: "",
              UseByDate: "",
              DisplayUntil: "",
            },
            IncidentProductPackSizes: {
              Size: "",
            },
            Name: "Another test product",
            PackDescription: "",
            ProductTypeId: 0,
          },
        ],
        IncidentStakeholders: {
          Name: "Timmy Testfield",
          Role: "Chief Tester",
          GovDept: "Testco Ltd.",
          Email: "timmy@testfield.com",
          Phone: "+44 1234 567 890",
        },
      },
    ],

    [
      "full product",
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
            AdditionalInfo: "extra info here",
            Amount: 987656789,
            AmountUnitTypeId: 2,
            BatchCodes: "11-11-11,22-22-22,333-333,444-4444",
            Brand: "Test brand",
            Companies: [
              {
                Addresses: {
                  AddressLine1: "Test line 1",
                  AddressLine2: "Test line 2",
                  TownCity: "Testtown",
                  County: "Testshire",
                  Postcode: "TE1 5ST",
                  CountryID: 17,
                },
                Contact: {
                  Name: "Peter Testman",
                  EmailAddress: "peter@example.com",
                  TelephoneNumber: "+44 1992 123 456",
                },
                FBOSTypes: 3,
                Name: "Testco",
              },
              {
                Addresses: {
                  AddressLine1: "",
                  AddressLine2: "",
                  TownCity: "",
                  County: "",
                  Postcode: "",
                  CountryID: 0,
                },
                Contact: {
                  Name: "",
                  EmailAddress: "gary@Example.com",
                  TelephoneNumber: "",
                },
                FBOSTypes: 2,
                Name: "Another testing company Ltd.",
              },
            ],
            CountryOfOriginId: 15,
            IncidentProductDates: {
              BestBeforeDate: "2015-12-31T00:00:00.000Z",
              UseByDate: "2021-11-19T00:00:00.000Z",
              DisplayUntil: "2023-02-01T00:00:00.000Z",
            },
            IncidentProductPackSizes: {
              Size: "44 units",
            },
            Name: "A test product name",
            PackDescription: "a big pack of things",
            ProductTypeId: 4,
          },
          {
            AdditionalInfo: "",
            Amount: 0,
            AmountUnitTypeId: 4,
            BatchCodes: "only-one-batch-code",
            Brand: "Another brand",
            Companies: [
              {
                Addresses: {
                  AddressLine1: "",
                  AddressLine2: "",
                  TownCity: "Testington",
                  County: "",
                  Postcode: "",
                  CountryID: 6,
                },
                Contact: {
                  Name: "",
                  EmailAddress: "",
                  TelephoneNumber: "",
                },
                FBOSTypes: 1,
                Name: "Large Testers PLC",
              },
            ],
            CountryOfOriginId: 6,
            IncidentProductDates: {
              BestBeforeDate: "",
              UseByDate: "2020-06-06T23:00:00.000Z",
              DisplayUntil: "",
            },
            IncidentProductPackSizes: {
              Size: "",
            },
            Name: "Another test product",
            PackDescription: "",
            ProductTypeId: 0,
          },
        ],
        IncidentStakeholders: {
          Name: "Timmy Testfield",
          Role: "Chief Tester",
          GovDept: "Testco Ltd.",
          Email: "timmy@testfield.com",
          Phone: "+44 1234 567 890",
        },
      },
    ],
  ];

  test.each(testCases)(`%s`, (description, given, expected) => {
    expect(assemblePayload(given)).toEqual(expected);
  });
});
