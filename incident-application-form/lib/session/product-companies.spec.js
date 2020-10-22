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
        "missing products[productId].companies",
        {
          session: {
            products: { [productId]: { anyOtherValidKey: {} } },
          },
          productId,
        },
        {},
      ],
      [
        "missing products[productId].companies.value",
        {
          session: {
            products: { [productId]: { companies: {} } },
          },
          productId,
        },
        {},
      ],
      [
        "happy path",
        {
          session: {
            products: {
              [productId]: { companies: { value: mockCompanies } },
            },
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
