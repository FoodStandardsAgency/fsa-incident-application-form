const { getCountries } = require("./countries");

describe(`lib/lookups/countries`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();

    console.error = jest.fn();
  });

  // TODO test this once we have an idea of the final response shape(?)
  xdescribe("getCountries", () => {
    const testCases = [
      [
        "rejected api response",
        {
          before: () => {
            fetch.mockReject(new Error("fake error message"));
          },
          after: () => {
            expect(console.error).toHaveBeenCalled();
          },
        },
        {
          selectedValue: 123,
        },
        [],
      ],
      [
        "unexpected api response",
        {
          before: () => {
            fetch.mockReject(new Error("fake error message"));
          },
          after: () => {
            expect(console.error).toHaveBeenCalled();
          },
        },
        {
          selectedValue: 123,
        },
        [],
      ],
    ];

    ["en", "cy"].forEach((languageCode) => {
      test.each(testCases)(
        `%s - ${languageCode}`,
        async (description, { before, after }, { selectedValue }, expected) => {
          before();
          const response = await getCountries(languageCode, selectedValue);
          expect(response).toEqual(expected);
          after();
        }
      );
    });
  });
});
