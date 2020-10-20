const { getSelectedOriginCountryFromSession } = require("./origin-country");

describe(`lib/session/origin-country`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSelectedOriginCountryFromSession", () => {
    const productId = "123-abc";
    const testCases = [
      ["missing products", { session: {}, productId }, 0],
      [
        "missing products[productId]",
        { session: { products: {} }, productId },
        0,
      ],
      [
        "missing products[productId].originCountry",
        {
          session: {
            products: { [productId]: { originCountry: {} } },
          },
          productId,
        },
        0,
      ],
      [
        "happy path",
        {
          session: {
            products: { [productId]: { originCountry: { value: 64 } } },
          },
          productId,
        },
        64,
      ],
    ];

    test.each(testCases)(
      `%s`,
      (description, { session, productId }, expected) => {
        expect(getSelectedOriginCountryFromSession(session, productId)).toEqual(
          expected
        );
      }
    );
  });
});
