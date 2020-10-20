const { getSelectedProductTypeFromSession } = require("./product-type");

describe(`lib/session/product-type`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSelectedProductTypeFromSession", () => {
    const productId = "123-abc";
    const testCases = [
      ["missing products", { session: {}, productId }, 0],
      [
        "missing products[productId]",
        { session: { products: {} }, productId },
        0,
      ],
      [
        "missing products[productId].productType",
        {
          session: {
            products: { [productId]: {} },
          },
          productId,
        },
        0,
      ],
      [
        "missing products[productId].productType",
        {
          session: {
            products: { [productId]: { productType: {} } },
          },
          productId,
        },
        0,
      ],
      [
        "missing products[productId].productType.value",
        {
          session: {
            products: { [productId]: { productType: {} } },
          },
          productId,
        },
        0,
      ],
      [
        "happy path",
        {
          session: {
            products: { [productId]: { productType: { value: "valid" } } },
          },
          productId,
        },
        "valid",
      ],
    ];

    test.each(testCases)(
      `%s`,
      (description, { session, productId }, expected) => {
        expect(getSelectedProductTypeFromSession(session, productId)).toEqual(
          expected
        );
      }
    );
  });
});
