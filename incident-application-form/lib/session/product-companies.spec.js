const { getProductCompaniesFromSession } = require("./product-companies");

describe(`lib/session/product-companies`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProductCompaniesFromSession", () => {
    const productId = "123-abc";
    const mockCompanies = {
      xxx: {},
      yyy: {},
      zzz: {},
    };

    const testCases = [
      ["missing products", { session: {}, productId }, {}],
      [
        "missing products[productId]",
        { session: { products: {} }, productId },
        {},
      ],
      [
        "missing products[productId].originCountry",
        {
          session: {
            products: { [productId]: { originCountry: {} } },
          },
          productId,
        },
        {},
      ],
      [
        "happy path",
        {
          session: {
            products: { [productId]: { companies: mockCompanies } },
          },
          productId,
        },
        mockCompanies,
      ],
    ];

    test.each(testCases)(
      `%s`,
      (description, { session, productId }, expected) => {
        expect(getProductCompaniesFromSession(session, productId)).toEqual(
          expected
        );
      }
    );
  });
});
