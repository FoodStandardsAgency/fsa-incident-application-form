const format = require("date-fns/format");
const isValid = require("date-fns/isValid");
const parse = require("date-fns/parse");

const DATE_FORMAT = "yyyy/M/d";

module.exports = {
  validateDate: (date, i18n) => {
    let validated = {
      isValid: false,
      messages: [],
      value: "",
      day: "",
      month: "",
      year: "",
    };

    if (!date) {
      return {
        date: {
          ...validated,
          isValid: true,
        },
      };
    }

    const { day, month, year } = date;

    if (!day && !month && !year) {
      return {
        date: {
          ...validated,
          isValid: true,
        },
      };
    }

    const dateObject = parse(
      `${year}/${month}/${day}`,
      DATE_FORMAT,
      new Date()
    );

    if (!isValid(dateObject)) {
      validated.messages.push(
        i18n.date.validation.invalidDate[i18n.languageCode]
      );

      return {
        date: {
          ...validated,
          isValid: false,
          value: "",
          day: day.toString(),
          month: month.toString(),
          year: year.toString(),
        },
      };
    }

    return {
      date: {
        ...validated,
        isValid: validated.messages.length === 0,
        value: format(dateObject, DATE_FORMAT) || "",
        // not ideal, but everything in validator.js expects & returns a string, so behaving consistently here.
        day: format(dateObject, "d"),
        month: format(dateObject, "M"),
        year: format(dateObject, "yyyy"),
      },
    };
  },
};
