const isEmpty = require("./is-empty");

describe(`lib/validation/is-empty`, () => {
  [
    {
      description: "No input",
      given: [],
      expected: true,
    },
    {
      description: "One empty input",
      given: [""],
      expected: true,
    },
    {
      description: "Ignores undefined",
      given: ["", undefined],
      expected: true,
    },
    {
      description: "One good entry",
      given: ["", undefined, "hello"],
      expected: false,
    },
    {
      description: "Nested object is properly checked",
      given: ["", { a: "b" }],
      expected: false,
    },
    {
      description: "Any value is acceptable",
      given: ["", undefined, " "],
      expected: false,
    },
    {
      description: "Zero is acceptable",
      given: ["", undefined, 0],
      expected: false,
    },
    {
      description: "False is acceptable",
      given: [false],
      expected: false,
    },
    {
      description: "Happy path",
      given: ["some", "good", "values", true, 1, 0, false, {}, null],
      expected: false,
    },
  ].forEach(({ description, given, expected }) => {
    it(`should determine whether is empty or not - ${description}`, () => {
      expect(isEmpty(given)).toEqual(expected);
    });
  });
});
