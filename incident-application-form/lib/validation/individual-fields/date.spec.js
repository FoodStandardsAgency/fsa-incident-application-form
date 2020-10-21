const { validateDate } = require("./date");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/date`, () => {
  const testCases = (languageCode) => [
    [
      "missing field",
      undefined,
      {
        date: {
          isValid: true,
          messages: [],
          value: "",
          day: "",
          month: "",
          year: "",
          human: "",
          iso: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        date: {
          isValid: true,
          messages: [],
          value: "",
          day: "",
          month: "",
          year: "",
          human: "",
          iso: "",
        },
      },
    ],
    [
      "provided field is empty",
      "",
      {
        date: {
          isValid: true,
          messages: [],
          value: "",
          day: "",
          month: "",
          year: "",
          human: "",
          iso: "",
        },
      },
    ],
    [
      "valid when provided key values are empty",
      {
        day: "",
        month: "",
        year: "",
      },
      {
        date: {
          isValid: true,
          messages: [],
          value: "",
          day: "",
          month: "",
          year: "",
          human: "",
          iso: "",
        },
      },
    ],
    [
      "provided field is not a date",
      {
        day: "chips",
        month: "egg",
        year: "ham",
      },
      {
        date: {
          isValid: false,
          messages: [translations.date.validation.invalidDate[languageCode]],
          value: "",
          day: "chips",
          month: "egg",
          year: "ham",
          human: "",
          iso: "",
        },
      },
    ],
    [
      "happy path - variant 1",
      {
        day: "5",
        month: "12",
        year: "2020",
      },
      {
        date: {
          isValid: true,
          messages: [],
          value: "2020/12/5",
          day: "5",
          month: "12",
          year: "2020",
          human: "Saturday, December 5th, 2020",
          iso: "2020-12-05T00:00:00.000Z",
        },
      },
    ],
    [
      "happy path - variant 2",
      {
        day: "31",
        month: "1",
        year: "1999",
      },
      {
        date: {
          isValid: true,
          messages: [],
          value: "1999/1/31",
          day: "31",
          month: "1",
          year: "1999",
          human: "Sunday, January 31st, 1999",
          iso: "1999-01-31T00:00:00.000Z",
        },
      },
    ],
    [
      "happy path - variant 3",
      {
        day: "3",
        month: "3",
        year: "3333",
      },
      {
        date: {
          isValid: true,
          messages: [],
          value: "3333/3/3",
          day: "3",
          month: "3",
          year: "3333",
          human: "Tuesday, March 3rd, 3333",
          iso: "3333-03-03T00:00:00.000Z",
        },
      },
    ],
    // [
    //   "happy path - variant 4",
    //   {
    //     day: "11",
    //     month: "11",
    //     year: "1111",
    //   },
    //   {
    //     date: {
    //       isValid: true,
    //       messages: [],
    //       value: "1111/11/11",
    //       day: "11",
    //       month: "11",
    //       year: "1111",
    //       human: "Saturday, November 11th, 1111",
    //       iso: "1111-11-11T00:00:00.000Z",
    //     },
    //   },
    // ],
  ];

  ["en", "cy"].forEach((languageCode) => {
    test.each(testCases(languageCode))(
      `%s - ${languageCode}`,
      (description, given, expected) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        expect(validateDate(given, i18n)).toEqual(expected);
      }
    );
  });
});
