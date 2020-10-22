const { assemblePayload } = require("./final-payload-assembly");

const mockSessionMultipleProductsMultipleCompanies = require("./__mocks__/session-mock-multiple-products-multiple-companies.json");

describe(`lib/formatting/final-payload-assembly`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    [
      "full",
      mockSessionMultipleProductsMultipleCompanies,
      {
        Addresses: {
          AddressLine1: "My line 1",
          AddressLine2: "My line 2",
          TownCity: "Test town",
          County: "Testingshire",
          Postcode: "TE1 5ST",
          CountryID: 17,
        },
        Incidents: {
          IncidentTitle: "1603353226",
          NotifierID: 18,
          NatureOfProblem: "Something happened...",
          ActionTaken: "Some action was taken...",
          DistributionDetails: "My things went to...",
          IllnessDetails: "People were ill with...",
          LocalAuthorityNotified: "I notified...",
          AdditionalInformation: "Here is some helpful text...",
        },
        IncidentProducts: [
          {
            AdditionalInfo: "Some helpful info here",
            Amount: 321,
            AmountUnitTypeId: 2,
            BatchCodes: "aaa-bbb,ccc-ddd,eee-fff",
            Brand: "Big brand co.",
            Companies: [
              {
                Addresses: {
                  AddressLine1: "5 Test street",
                  AddressLine2: "Testway",
                  TownCity: "Leeds",
                  County: "Yorkshire",
                  Postcode: "TE3 4GT",
                  CountryID: 17,
                },
                Contact: {
                  Name: "Peter tester",
                  EmailAddress: "peter@example.com",
                  TelephoneNumber: "01889 987123",
                },
                FBOSTypes: 1,
                Name: "First distributor co",
              },
              {
                Addresses: {
                  AddressLine1: "11 North Street",
                  AddressLine2: "Southfield",
                  TownCity: "Eastham",
                  County: "Westcashire",
                  Postcode: "WE1 2NM",
                  CountryID: 17,
                },
                Contact: {
                  Name: "Sarah tester",
                  EmailAddress: "sarah@example.com",
                  TelephoneNumber: "06634 717171",
                },
                FBOSTypes: 2,
                Name: "Second org name",
              },
            ],
            CountryOfOriginId: 65,
            IncidentProductDates: {
              BestBeforeDate: "2020-01-12T00:00:00.000Z",
              UseByDate: "2021-12-01T00:00:00.000Z",
              DisplayUntil: "2022-08-30T23:00:00.000Z",
            },
            IncidentProductPackSizes: { Size: "200g pack" },
            Name: "Impacted product here",
            PackDescription: "The product looked fine",
            ProductTypeId: 15,
          },
          {
            AdditionalInfo: "Some more info",
            Amount: 3456,
            AmountUnitTypeId: 3,
            BatchCodes: "www-www-111,ppp-ooo-uuu",
            Brand: "Another brand name",
            Companies: [
              {
                Addresses: {
                  AddressLine1: "1 The Street",
                  AddressLine2: "",
                  TownCity: "A Town",
                  County: "Countydown",
                  Postcode: "SD1 2RT",
                  CountryID: 4,
                },
                Contact: {
                  Name: "Larry tester",
                  EmailAddress: "larry@example.com",
                  TelephoneNumber: "01662 534533",
                },
                FBOSTypes: 3,
                Name: "Retailer co",
              },
            ],
            CountryOfOriginId: 32,
            IncidentProductDates: {
              BestBeforeDate: "2022-02-22T00:00:00.000Z",
              UseByDate: "2033-03-03T00:00:00.000Z",
              DisplayUntil: "1999-11-11T00:00:00.000Z",
            },
            IncidentProductPackSizes: { Size: "400 to a pack" },
            Name: "Second product",
            PackDescription: "A big pack of things",
            ProductTypeId: 24,
          },
        ],
        IncidentStakeholders: {
          Name: "John Tester",
          Role: "Chief Tester",
          GovDept: "Testco Ltd.",
          Email: "john@example.com",
          Phone: "+44 1882 123 456",
        },
      },
    ],
  ];

  test.each(testCases)(`%s`, (description, given, expected) => {
    expect(assemblePayload(given)).toEqual(expected);
  });
});
