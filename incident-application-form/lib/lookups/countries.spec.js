const { getSelectedCountryFromSession, getCountries } = require("./countries");

describe(`lib/lookups/countries`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();

    console.error = jest.fn();
  });

  describe("getSelectedCountryFromSession", () => {
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
      expect(getSelectedCountryFromSession(given)).toEqual(expected);
    });
  });

  // TODO test this once we have an idea of the final response shape(?)
  // describe("getCountries", () => {
  //   const testCases = [
  //     [
  //       "rejected api response",
  //       {
  //         before: () => {
  //           fetch.mockReject(new Error("fake error message"));
  //         },
  //         after: () => {
  //           expect(console.error).toHaveBeenCalled();
  //         },
  //       },
  //       {
  //         selectedValue: 123,
  //       },
  //       [],
  //     ],
  //     [
  //       "unexpected api response",
  //       {
  //         before: () => {
  //           fetch.mockReject(new Error("fake error message"));
  //         },
  //         after: () => {
  //           expect(console.error).toHaveBeenCalled();
  //         },
  //       },
  //       {
  //         selectedValue: 123,
  //       },
  //       [],
  //     ],
  //   ];
  //
  //   ["en", "cy"].forEach((languageCode) => {
  //     test.each(testCases)(
  //       `%s - ${languageCode}`,
  //       async (description, { before, after }, { selectedValue }, expected) => {
  //         before();
  //         const response = await getCountries(languageCode, selectedValue);
  //         expect(response).toEqual(expected);
  //         after();
  //       }
  //     );
  //   });
  // });
});
