const { getSelectedUnitTypeFromSession } = require("./unit-type");

describe(`lib/session/unit-type`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSelectedUnitTypeFromSession", () => {
    const productId = "123-abc";
    const testCases = [
      ["missing products", { session: {}, productId }, 0],
      [
        "missing products[productId]",
        { session: { products: {} }, productId },
        0,
      ],
      [
        "missing products[productId].unitType",
        {
          session: {
            products: { [productId]: {} },
          },
          productId,
        },
        0,
      ],
      [
        "missing products[productId].unitType",
        {
          session: {
            products: { [productId]: { unit: {} } },
          },
          productId,
        },
        0,
      ],
      [
        "missing products[productId].unitType.value",
        {
          session: {
            products: { [productId]: { unitType: {} } },
          },
          productId,
        },
        0,
      ],
      [
        "happy path",
        {
          session: {
            products: { [productId]: { unitType: { value: "valid" } } },
          },
          productId,
        },
        "valid",
      ],
    ];

    test.each(testCases)(
      `%s`,
      (description, { session, productId }, expected) => {
        expect(getSelectedUnitTypeFromSession(session, productId)).toEqual(
          expected
        );
      }
    );
  });
});
