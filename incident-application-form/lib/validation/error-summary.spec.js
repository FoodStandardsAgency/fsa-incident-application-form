const { getErrorSummaryFromValidation } = require("./error-summary");

describe(`lib/validation/error-summary`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getErrorSummaryFromValidation", () => {
    const testCases = [
      ["no errors", { validatedFields: {} }, []],
      [
        "one error",
        {
          validatedFields: {
            "test-field-1": {
              messages: ["an error here"],
            },
          },
        },
        [
          {
            href: "#test-field-1",
            text: "an error here",
          },
        ],
      ],
      [
        "multiple errors",
        {
          validatedFields: {
            "test-field-1": {
              messages: ["an error here"],
            },
            "test-field-2": {
              messages: ["an error here", "another error here"],
            },
            "test-field-3": {
              messages: [],
            },
            "test-field-4": {
              messages: ["an error here"],
            },
          },
        },
        [
          {
            href: "#test-field-1",
            text: "an error here",
          },
          {
            href: "#test-field-2",
            text: "an error here",
          },
          {
            href: "#test-field-2",
            text: "another error here",
          },
          {
            href: "#test-field-4",
            text: "an error here",
          },
        ],
      ],
      [
        "nested fields",
        {
          validatedFields: {
            "nested-key": {
              "test-field-1": {
                messages: [],
              },
              "test-field-2": {
                messages: ["a nested error here"],
              },
            },
          },
        },
        [
          {
            href: "#nested-key.test-field-2",
            text: "a nested error here",
          },
        ],
      ],
    ];

    test.each(testCases)(`%s`, (description, given, expected) => {
      expect(getErrorSummaryFromValidation(given)).toEqual(expected);
    });
  });
});
