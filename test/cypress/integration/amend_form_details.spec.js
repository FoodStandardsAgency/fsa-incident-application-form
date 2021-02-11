const SIMS_LOOKUP_DATA = require("../fixtures/sample-dropdown-data.json");
const {
  optionalFields: companyOptionalFields,
} = require("./../support/optional-fields/add-company");
const {
  optionalFields: productOptionalFields,
} = require("./../support/optional-fields/add-product");
const translations = require("../../../incident-application-form/translations/complete.json");

const YOUR_DETAILS = Cypress.config("contactDetails");
const COMPLETE = Cypress.config("complete");

const options = { force: true };

context(
  "As a service user, I want to amend my form submission on the preview page",
  () => {
    beforeEach(() => {
      // catches, logs and ignores any load-errors on the page..
      // can probably delete this but worth including in 1st template in case we need it..
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err.stack);
        return false;
      });

      cy.flushPayloads();
      cy.setupSimsLookups(SIMS_LOOKUP_DATA);
    });

    [
      {
        countryCode: "EN",
        url: YOUR_DETAILS,
      },
      {
        countryCode: "CY",
        url: `/cy/${YOUR_DETAILS}`,
      },
    ].forEach(({ countryCode, url }) => {
      describe(countryCode, () => {
        it(`Visit ${url}, fill in the minimal amount of valid data, submit`, () => {
          cy.visit(url);

          cy.fillInContactDetails({
            fieldsToSkip: [
              "position",
              "organisation",
              "email",
              "address.line1",
              "address.line2",
              "address.county",
              "address.postcode",
            ],
          });

          cy.get('[data-cy="submit"]').click(options);

          cy.fillInDetailsOfIncident({
            fieldsToSkip: [
              "action-taken",
              "distribution-details",
              "illness-details",
              "local-authority-notified",
              "additional-information",
            ],
          });
          cy.get('[data-cy="submit"]').click(options);

          cy.get('[data-cy="add-product"]').click(options);
          cy.fillInProduct({
            fieldsToSkip: productOptionalFields,
          });

          cy.get('[data-cy="add-company"]').click(options);
          cy.fillInCompany({
            fieldsToSkip: companyOptionalFields,
          });
          cy.get('[data-cy="submit"]').click(options);

          // submit the now valid product page
          cy.get('[data-cy="submit"]').click(options);

          // click the 'change' link under "details of incident"
          cy.get('[data-cy="change-details-of-incident"]').click(options);

          // don't change anything, just click "next"
          cy.get('[data-cy="submit"]').click(options);

          // don't change anything on the "product details" page, just save and continue
          cy.get('[data-cy="submit"]').click(options);

          // submit the preview page
          cy.get('[data-cy="submit"]').click(options);

          cy.url().should("contain", `/${COMPLETE}`);

          cy.get('[data-cy="reference-number"]').should(
            "contain",
            translations.text.yourReferenceNumber[countryCode.toLowerCase()]
          );

          // get a list of all the things that have been posted to our test-hook since we last flushed
          cy.listPayloadsReceived().then((payloads) => {
            expect(payloads[0].Addresses).to.deep.equal({
              AddressLine1: "",
              AddressLine2: "",
              TownCity: "Testingtown",
              County: "",
              Postcode: "",
              CountryID: 184,
            });

            const incidentsWithoutTitle = { ...payloads[0].Incidents };
            delete incidentsWithoutTitle.IncidentTitle;

            const incidentTitle = payloads[0].Incidents.IncidentTitle;
            delete payloads[0].Incidents.IncidentTitle;

            expect(payloads[0].Incidents).to.deep.equal({
              NotifierID: 4,
              NatureOfProblem: "The nature of my problem is salmonella",
              ActionTaken: "",
              DistributionDetails: "",
              IllnessDetails: "",
              LocalAuthorityNotified: "",
              AdditionalInformation: "",
            });

            expect(typeof incidentTitle === "string").to.be.true;
            expect(parseInt(incidentTitle, 10)).to.be.greaterThan(
              1607697310286
            );

            expect(payloads[0].IncidentProducts).to.deep.equal([
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
                      CountryID: 90,
                    },
                    Contact: {
                      Name: "",
                      EmailAddress: "",
                      TelephoneNumber: "",
                    },
                    FBOSTypes: [16],
                    Name: "",
                  },
                ],
                CountryOfOriginId: 90,
                IncidentProductDates: {
                  BestBeforeDate: "",
                  UseByDate: "",
                  DisplayUntil: "",
                },
                IncidentProductPackSizes: {
                  Size: "",
                  UnitId: 0,
                },
                Name: "An example product name",
                PackDescription: "",
                ProductTypeId: 0,
              },
            ]);
            expect(payloads[0].IncidentStakeholders).to.deep.equal({
              Name: "my name here",
              Role: "",
              GovDept: "",
              Email: "",
              Phone: "01234 445 667",
            });
          });
        });
      });
    });
  }
);
