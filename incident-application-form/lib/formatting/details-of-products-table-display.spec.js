const { formatProducts } = require("./details-of-products-table-display");
const nunjucks = require("nunjucks");

jest.mock("nunjucks");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/formatting/details-of-products-table-display`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const routesStub = {};

  const testProducts = {
    "123-abc": {
      productName: {
        value: "product 123-abc",
      },
    },
    "456-xyz": {
      productName: {
        value: "another product here",
      },
    },
  };

  const testCases = () => [
    [
      "no products",
      {},
      {
        expectedValue: [],
        nunjucksTest: () => expect(nunjucks.render).not.toHaveBeenCalled(),
      },
    ],
    [
      "one product",
      {
        "123-abc": testProducts["123-abc"],
      },
      {
        expectedValue: [
          [
            {
              text: testProducts["123-abc"].productName.value,
              attributes: {
                "data-cy": "product-name-0",
              },
            },
            { html: undefined },
          ],
        ],
        nunjucksTest: (i18n) => {
          expect(nunjucks.render).toHaveBeenCalledWith(
            `${__dirname}/../../views/partials/details-of-products-actions.njk`,
            {
              i18n,
              id: "123-abc",
              routes: routesStub,
              index: 0,
            }
          );
          expect(nunjucks.render.mock.calls.length).toBe(1);
        },
      },
    ],
    [
      "multiple products",
      {
        "123-abc": testProducts["123-abc"],
        "456-xyz": testProducts["456-xyz"],
      },
      {
        expectedValue: [
          [
            {
              text: testProducts["123-abc"].productName.value,
              attributes: {
                "data-cy": "product-name-0",
              },
            },
            { html: undefined },
          ],
          [
            {
              text: testProducts["456-xyz"].productName.value,
              attributes: {
                "data-cy": "product-name-1",
              },
            },
            { html: undefined },
          ],
        ],
        nunjucksTest: (i18n) => {
          expect(nunjucks.render).toHaveBeenCalledWith(
            `${__dirname}/../../views/partials/details-of-products-actions.njk`,
            {
              i18n,
              id: "123-abc",
              routes: routesStub,
              index: 0,
            }
          );
          expect(nunjucks.render).toHaveBeenCalledWith(
            `${__dirname}/../../views/partials/details-of-products-actions.njk`,
            {
              i18n,
              id: "456-xyz",
              routes: routesStub,
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

        expect(formatProducts(given, i18n, routesStub)).toEqual(expectedValue);
        nunjucksTest(i18n);
      }
    );
  });
});
