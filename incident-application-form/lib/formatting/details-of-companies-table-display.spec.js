const { formatCompanies } = require("./details-of-companies-table-display");
const nunjucks = require("nunjucks");

jest.mock("nunjucks");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/formatting/details-of-companies-table-display`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const routesStub = {};
  const mockProductId = "mock-product-id";

  const testCompanies = {
    "123-abc": {
      companyName: {
        value: "company 123-abc",
      },
    },
    "456-xyz": {
      companyName: {
        value: "another company here",
      },
    },
  };

  const testCases = () => [
    [
      "no companies",
      {},
      {
        expectedValue: [],
        nunjucksTest: () => expect(nunjucks.render).not.toHaveBeenCalled(),
      },
    ],
    [
      "one company",
      {
        "123-abc": testCompanies["123-abc"],
      },
      {
        expectedValue: [
          [
            {
              text: testCompanies["123-abc"].companyName.value,
              attributes: {
                "data-cy": "company-name-0",
              },
            },
            { html: undefined },
          ],
        ],
        nunjucksTest: (i18n) => {
          expect(nunjucks.render).toHaveBeenCalledWith(
            `${__dirname}/../../views/partials/details-of-companies-actions.njk`,
            {
              i18n,
              companyId: "123-abc",
              productId: mockProductId,
              routes: routesStub,
              index: 0,
            }
          );
          expect(nunjucks.render.mock.calls.length).toBe(1);
        },
      },
    ],
    [
      "multiple companies",
      {
        "123-abc": testCompanies["123-abc"],
        "456-xyz": testCompanies["456-xyz"],
      },
      {
        expectedValue: [
          [
            {
              text: testCompanies["123-abc"].companyName.value,
              attributes: {
                "data-cy": "company-name-0",
              },
            },
            { html: undefined },
          ],
          [
            {
              text: testCompanies["456-xyz"].companyName.value,
              attributes: {
                "data-cy": "company-name-1",
              },
            },
            { html: undefined },
          ],
        ],
        nunjucksTest: (i18n) => {
          expect(nunjucks.render).toHaveBeenCalledWith(
            `${__dirname}/../../views/partials/details-of-companies-actions.njk`,
            {
              i18n,
              companyId: "123-abc",
              routes: routesStub,
              productId: mockProductId,
              index: 0,
            }
          );
          expect(nunjucks.render).toHaveBeenCalledWith(
            `${__dirname}/../../views/partials/details-of-companies-actions.njk`,
            {
              i18n,
              companyId: "456-xyz",
              routes: routesStub,
              productId: mockProductId,
              index: 1,
            }
          );
          expect(nunjucks.render.mock.calls.length).toBe(2);
        },
      },
    ],
  ];

  ["en", "cy"].forEach((languageCode) => {
    test.each(testCases(languageCode))(
      `%s - ${languageCode}`,
      (description, given, { expectedValue, nunjucksTest }) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        expect(formatCompanies(given, mockProductId, i18n, routesStub)).toEqual(
          expectedValue
        );
        nunjucksTest(i18n);
      }
    );
  });
});
