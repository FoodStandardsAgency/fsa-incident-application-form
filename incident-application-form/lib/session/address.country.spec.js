const { getSelectedAddressCountryFromSession } = require("./address.country");

describe(`lib/session/address.country`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSelectedAddressCountryFromSession", () => {
    const testCases = [
      ["undefined", undefined, 0],
      ["missing yourDetails", {}, 0],
      ["missing yourDetails.address", { yourDetails: {} }, 0],
      [
        "missing yourDetails.address.country",
        { yourDetails: { address: {} } },
        0,
      ],
      [
        "missing yourDetails.address.country.value",
        { yourDetails: { address: { country: {} } } },
        0,
      ],
      [
        "happy path",
        { yourDetails: { address: { country: { value: 22 } } } },
        22,
      ],
    ];

    test.each(testCases)(`%s`, (description, given, expected) => {
      expect(getSelectedAddressCountryFromSession(given)).toEqual(expected);
    });
  });
});
