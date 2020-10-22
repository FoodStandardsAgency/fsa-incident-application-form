const { camelToKebab } = require("./camel-to-kebab");

describe(`lib/validation/camel-to-kebab`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("camelToKebab", () => {
    const testCases = [
      ["no change", "aaa", "aaa"],
      ["simple change", "helloWorld", "hello-world"],
    ];

    test.each(testCases)(`%s`, (description, given, expected) => {
      expect(camelToKebab(given)).toEqual(expected);
    });
  });
});
