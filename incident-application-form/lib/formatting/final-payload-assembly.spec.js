const { assemblePayload } = require("./final-payload-assembly");

describe(`lib/formatting/final-payload-assembly`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [["happy path", {}, {}]];

  test.each(testCases)(`%s`, (description, given, expected) => {
    expect(assemblePayload(given)).toEqual(expected);
  });
});
