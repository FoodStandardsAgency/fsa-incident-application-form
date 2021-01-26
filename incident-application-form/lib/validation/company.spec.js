const { validate } = require("./company");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/company`, () => {
  const testCases = (languageCode) => [
    [
      "invalid",
      {
        companyName: "",
      },
      {
        isEmpty: true,
        isValid: false,
        validatedFields: {
          address: {
            country: {
              isValid: true,
              messages: [],
              value: "",
            },
            county: {
              isValid: true,
              messages: [],
              value: "",
            },
            line1: {
              isValid: true,
              messages: [],
              value: "",
            },
            line2: {
              isValid: true,
              messages: [],
              value: "",
            },
            postcode: {
              isValid: true,
              messages: [],
              value: "",
            },
            town: {
              isValid: true,
              messages: [],
              value: "",
            },
          },
          companyName: {
            isValid: true,
            messages: [],
            value: "",
          },
          companyType: {
            isValid: false,
            messages: [
              translations.companyType.validation.required[languageCode],
            ],
            value: "",
          },
          contactName: {
            isValid: true,
            messages: [],
            value: "",
          },
          email: {
            isValid: true,
            messages: [],
            value: "",
          },
          telephone1: {
            isValid: true,
            messages: [],
            value: "",
          },
        },
      },
    ],
    [
      "minimal valid fields",
      {
        companyName: "valid",
        companyType: "3",
      },
      {
        isEmpty: false,
        isValid: true,
        validatedFields: {
          address: {
            country: {
              isValid: true,
              messages: [],
              value: "",
            },
            county: {
              isValid: true,
              messages: [],
              value: "",
            },
            line1: {
              isValid: true,
              messages: [],
              value: "",
            },
            line2: {
              isValid: true,
              messages: [],
              value: "",
            },
            postcode: {
              isValid: true,
              messages: [],
              value: "",
            },
            town: {
              isValid: true,
              messages: [],
              value: "",
            },
          },
          companyName: {
            isValid: true,
            messages: [],
            value: "valid",
          },
          companyType: {
            isValid: true,
            messages: [],
            value: "3",
          },
          contactName: {
            isValid: true,
            messages: [],
            value: "",
          },
          email: {
            isValid: true,
            messages: [],
            value: "",
          },
          telephone1: {
            isValid: true,
            messages: [],
            value: "",
          },
        },
      },
    ],
    [
      "default values, invalid and empty",
      {
        companyName: "",
        companyType: "0",
        contactName: "",
        email: "",
        telephone1: "",
        addressLine1: "",
        addressLine2: "",
        addressTown: "",
        addressCounty: "",
        addressPostcode: "",
        addressCountry: "0",
      },
      {
        isEmpty: true,
        isValid: false,
        validatedFields: {
          address: {
            country: {
              isValid: true,
              messages: [],
              value: "0",
            },
            county: {
              isValid: true,
              messages: [],
              value: "",
            },
            line1: {
              isValid: true,
              messages: [],
              value: "",
            },
            line2: {
              isValid: true,
              messages: [],
              value: "",
            },
            postcode: {
              isValid: true,
              messages: [],
              value: "",
            },
            town: {
              isValid: true,
              messages: [],
              value: "",
            },
          },
          companyName: {
            isValid: true,
            messages: [],
            value: "",
          },
          companyType: {
            isValid: false,
            messages: [
              translations.companyType.validation.required[languageCode],
            ],
            value: "0",
          },
          contactName: {
            isValid: true,
            messages: [],
            value: "",
          },
          email: {
            isValid: true,
            messages: [],
            value: "",
          },
          telephone1: {
            isValid: true,
            messages: [],
            value: "",
          },
        },
      },
    ],
  ];

  ["en", "cy"].forEach((languageCode) => {
    test.each(testCases(languageCode))(
      `%s - ${languageCode}`,
      (description, given, expected) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        const outcome = validate(given, i18n);

        expect(outcome).toEqual(expected);
      }
    );
  });
});
