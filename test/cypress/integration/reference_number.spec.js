const SIMS_LOOKUP_DATA = require("../fixtures/sample-dropdown-data.json");
const {
  optionalFields: companyOptionalFields,
} = require("./../support/optional-fields/add-company");
const {
  optionalFields: productOptionalFields,
} = require("./../support/optional-fields/add-product");

const YOUR_DETAILS = Cypress.config("contactDetails");
const COMPLETE = Cypress.config("complete");

const options = { force: true };

context(
  "As a service user, I want to see a summary of my report, so that I can check it’s accurate.",
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

    describe("EN", () => {
      it(`Visit ${YOUR_DETAILS}, fill in some valid data, submit, prove it exists on the preview`, () => {
        cy.visit(YOUR_DETAILS);

        cy.fillInContactDetails();
        cy.get('[data-cy="submit"]').click(options);

        cy.fillInDetailsOfIncident();
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

        // submit the preview page
        cy.get('[data-cy="submit"]').click(options);

        cy.url().should("contain", `/${COMPLETE}`);

        cy.get('[data-cy="reference-number"]').should(
          "contain",
          `reference number`
        );

        // get a list of all the things that have been posted to our test-hook since we last flushed
        cy.listPayloadsReceived().then((payloads) => {
          expect(payloads[0].Addresses).to.deep.equal({
            AddressLine1: "123 Test Street",
            AddressLine2: "Testfield",
            TownCity: "Testingtown",
            County: "Testshire",
            Postcode: "TE1 5ST",
            CountryID: 184,
          });

          const incidentsWithoutTitle = { ...payloads[0].Incidents };
          delete incidentsWithoutTitle.IncidentTitle;

          const incidentTitle = payloads[0].Incidents.IncidentTitle;
          delete payloads[0].Incidents.IncidentTitle;

          expect(payloads[0].Incidents).to.deep.equal({
            NotifierID: 4,
            NatureOfProblem: "The nature of my problem is salmonella",
            ActionTaken: "I have notified the authorities",
            DistributionDetails: "This was distributed to the South East",
            IllnessDetails: "People are being sick",
            LocalAuthorityNotified: "I notified the following...",
            AdditionalInformation: "I also have told the police.",
          });

          expect(typeof incidentTitle === "string").to.be.true;
          expect(parseInt(incidentTitle, 10)).to.be.greaterThan(1607697310286);

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
                    CountryID: 0,
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
              IncidentProductPackSizes: { Size: "" },
              Name: "An example product name",
              PackDescription: "",
              ProductTypeId: 0,
            },
          ]);
          expect(payloads[0].IncidentStakeholders).to.deep.equal({
            Name: "my name here",
            Role: "my position",
            GovDept: "Test corp",
            Email: "my.email@somewhere.com",
            Phone: "01234 445 667",
          });
        });
      });
    });

    describe("CY", () => {
      it(`Visit /cy/${YOUR_DETAILS}, fill in some valid data, submit, prove it exists on the preview`, () => {
        cy.visit(`/cy/${YOUR_DETAILS}`);

        cy.fillInContactDetails();
        cy.get('[data-cy="submit"]').click(options);

        cy.fillInDetailsOfIncident();
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

        // submit the preview page
        cy.get('[data-cy="submit"]').click(options);

        cy.url().should("contain", `/cy/${COMPLETE}`);

        cy.get('[data-cy="reference-number"]').should(
          "contain",
          `Eich cyfeirnod`
        );

        // get a list of all the things that have been posted to our test-hook since we last flushed
        cy.listPayloadsReceived().then((payloads) => {
          expect(payloads[0].Addresses).to.deep.equal({
            AddressLine1: "123 Test Street",
            AddressLine2: "Testfield",
            TownCity: "Testingtown",
            County: "Testshire",
            Postcode: "TE1 5ST",
            CountryID: 184,
          });

          const incidentsWithoutTitle = { ...payloads[0].Incidents };
          delete incidentsWithoutTitle.IncidentTitle;

          const incidentTitle = payloads[0].Incidents.IncidentTitle;
          delete payloads[0].Incidents.IncidentTitle;

          expect(payloads[0].Incidents).to.deep.equal({
            NotifierID: 4,
            NatureOfProblem: "The nature of my problem is salmonella",
            ActionTaken: "I have notified the authorities",
            DistributionDetails: "This was distributed to the South East",
            IllnessDetails: "People are being sick",
            LocalAuthorityNotified: "I notified the following...",
            AdditionalInformation: "I also have told the police.",
          });

          expect(typeof incidentTitle === "string").to.be.true;
          expect(parseInt(incidentTitle, 10)).to.be.greaterThan(1607697310286);

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
                    CountryID: 0,
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
              IncidentProductPackSizes: { Size: "" },
              Name: "An example product name",
              PackDescription: "",
              ProductTypeId: 0,
            },
          ]);
          expect(payloads[0].IncidentStakeholders).to.deep.equal({
            Name: "my name here",
            Role: "my position",
            GovDept: "Test corp",
            Email: "my.email@somewhere.com",
            Phone: "01234 445 667",
          });
        });
      });
    });
  }
);
