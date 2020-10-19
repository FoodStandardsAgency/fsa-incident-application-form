const { getSelectedNotifierTypeFromSession } = require("./notifier-types");

describe(`lib/lookups/notifier-types`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSelectedNotifierTypeFromSession", () => {
    const testCases = [
      ["undefined", undefined, 0],
      ["missing yourDetails", {}, 0],
      ["missing yourDetails.notifierType", { yourDetails: {} }, 0],
      [
        "missing yourDetails.notifierType.value",
        { yourDetails: { notifierType: {} } },
        0,
      ],
      ["happy path", { yourDetails: { notifierType: { value: 64 } } }, 64],
    ];

    test.each(testCases)(`%s`, (description, given, expected) => {
      expect(getSelectedNotifierTypeFromSession(given)).toEqual(expected);
    });
  });
});
