const { allValid } = require("../validation/all-valid");

describe(`lib/validation/all-valid`, () => {
  const testCases = [
    ["one invalid - single", [{ x: { isValid: false } }], false],
    [
      "two invalid - both",
      [{ x: { isValid: false } }, { y: { isValid: false } }],
      false,
    ],
    [
      "one invalid - mix",
      [
        { a: { isValid: true } },
        { b: { isValid: false } },
        { c: { isValid: true } },
      ],
      false,
    ],
    [
      "two invalid - mix",
      [
        { a: { isValid: true } },
        { b: { isValid: false } },
        { c: { isValid: true } },
      ],
      false,
    ],
    ["valid - single", [{ a: { isValid: true } }], true],
    [
      "valid - multiple",
      [
        { a: { isValid: true } },
        { b: { isValid: true } },
        { c: { isValid: true } },
      ],
      true,
    ],
  ];

  test.each(testCases)(`%s`, (description, given, expected) => {
    expect(allValid(given)).toEqual(expected);
  });
});
