const { getSelectedPackUnitTypeFromSession } = require("./pack-unit-type");

describe(`lib/session/pack-unit-type`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSelectedPackUnitTypeFromSession", () => {
    const productId = "123-abc";
    const testCases = [
      ["missing products", { session: {}, productId }, 0],
      [
        "missing products[productId]",
        { session: { products: {} }, productId },
        0,
      ],
      [
        "missing products[productId].packUnitType",
        {
          session: {
            products: { [productId]: {} },
          },
          productId,
        },
        0,
      ],
      [
        "missing products[productId].packUnitType",
        {
          session: {
            products: { [productId]: { unit: {} } },
          },
          productId,
        },
        0,
      ],
      [
        "missing products[productId].packUnitType.value",
        {
          session: {
            products: { [productId]: { packUnitType: {} } },
          },
          productId,
        },
        0,
      ],
      [
        "happy path",
        {
          session: {
            products: { [productId]: { packUnitType: { value: "valid" } } },
          },
          productId,
        },
        "valid",
      ],
    ];

    test.each(testCases)(
      `%s`,
      (description, { session, productId }, expected) => {
        expect(getSelectedPackUnitTypeFromSession(session, productId)).toEqual(
          expected
        );
      }
    );
  });
});
