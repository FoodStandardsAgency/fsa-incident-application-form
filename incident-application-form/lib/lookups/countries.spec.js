const { getCountries } = require("./countries");

const mockSimsLookupResponse = require(`${__dirname}/__mocks__/mock-sims-lookup-response-slim.json`);

const expectedShape = [
  { selected: false, text: "Andorra", value: 1 },
  { selected: false, text: "England", value: 91 },
  { selected: false, text: "Northern Ireland", value: 92 },
  { selected: false, text: "Not Easily Identified", value: 282 },
  { selected: false, text: "Other", value: 283 },
  { selected: false, text: "Scotland", value: 93 },
  { selected: false, text: "Territory", value: 284 },
  { selected: false, text: "United Arab Emirates", value: 2 },
  { selected: true, text: "United Kingdom", value: 90 },
  { selected: false, text: "Wales", value: 94 },
];

describe(`lib/lookups/countries`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();

    console.error = jest.fn();
  });

  describe("getCountries", () => {
    ["en", "cy"].forEach((languageCode) => {
      it(`should handle an unexpected api response - ${languageCode}`, async () => {
        fetch.mockReject(new Error("fake error message"));

        const fakeSelectedValue = 123;

        const response = await getCountries(languageCode, fakeSelectedValue);

        expect(response).toEqual([]);

        expect(console.error).toHaveBeenCalled();
      });
    });

    describe("valid api response", () => {
      beforeEach(() => {
        fetch.mockResponse(JSON.stringify(mockSimsLookupResponse));
      });

      ["en", "cy"].forEach((languageCode) => {
        describe(`should default to the United Kingdom when selectedValue is explicitly zero`, () => {
          test(languageCode, async () => {
            expect(await getCountries(languageCode, 0)).toEqual(expectedShape);
          });
        });

        describe("should default to the United Kingdom when selectedValue is implicitly zero", () => {
          test(languageCode, async () => {
            expect(await getCountries(languageCode)).toEqual(expectedShape);
          });
        });

        describe("should allow overriding the selected country when value is > 0", () => {
          test(languageCode, async () => {
            const expected = [
              ...expectedShape.filter(
                (s) => s.value !== 2 && s.value !== 90 && s.value !== 94
              ),
              { selected: true, text: "United Arab Emirates", value: 2 },
              { selected: false, text: "United Kingdom", value: 90 },
              { selected: false, text: "Wales", value: 94 },
            ];

            expect(await getCountries(languageCode, 2)).toEqual(expected);
          });
        });
      });
    });
  });
});
