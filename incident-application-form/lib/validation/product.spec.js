const { validate } = require("./product");

const translations = require(`${__dirname}/../../translations/form-fields.json`);

describe(`lib/validation/product`, () => {
  const testCases = (languageCode) => [
    [
      "invalid",
      {
        fields: {
          companyName: "",
          brand: "",
          companies: {},
        },
        options: {
          isCreate: false,
        },
      },
      {
        isValid: false,
        validatedFields: {
          additionalInformation: { isValid: true, messages: [], value: "" },
          amountImportedDistributed: { isValid: true, messages: [], value: "" },
          batchCodes: { isValid: true, messages: [], value: "" },
          bestBefore: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
          brand: { isValid: true, messages: [], value: "" },
          companies: {
            isValid: false,
            messages: [
              translations.companies.validation.required[languageCode],
            ],
            value: {},
          },
          displayUntil: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
          originCountry: {
            isValid: false,
            messages: [
              translations.address.country.validation.required[languageCode],
            ],
            value: "",
          },
          packSize: { isValid: true, messages: [], value: "" },
          packageDescription: { isValid: true, messages: [], value: "" },
          productName: {
            isValid: false,
            messages: [
              translations.productName.validation.required[languageCode],
            ],
            value: "",
          },
          productType: { isValid: true, messages: [], value: "" },
          unitType: { isValid: true, messages: [], value: "" },
          useBy: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
        },
      },
    ],
    [
      "companies are not needed on create",
      {
        fields: {
          productName: "valid",
          // brand: "valid",
          originCountry: "17",
          companies: {},
        },
        options: {
          isCreate: true,
        },
      },
      {
        isValid: true,
        validatedFields: {
          additionalInformation: { isValid: true, messages: [], value: "" },
          amountImportedDistributed: { isValid: true, messages: [], value: "" },
          batchCodes: { isValid: true, messages: [], value: "" },
          bestBefore: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
          brand: { isValid: true, messages: [], value: "" },
          companies: {
            isValid: true,
            messages: [],
            value: {},
          },
          displayUntil: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
          originCountry: { isValid: true, messages: [], value: "17" },
          packSize: { isValid: true, messages: [], value: "" },
          packageDescription: { isValid: true, messages: [], value: "" },
          productName: { isValid: true, messages: [], value: "valid" },
          productType: { isValid: true, messages: [], value: "" },
          unitType: { isValid: true, messages: [], value: "" },
          useBy: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
        },
      },
    ],
    [
      "not every field is required",
      {
        fields: {
          productName: "valid",
          // brand: "valid",
          originCountry: "17",
          companies: {
            "123-abc": {
              name: "valid",
            },
          },
        },
        options: {
          isCreate: false,
        },
      },
      {
        isValid: true,
        validatedFields: {
          additionalInformation: { isValid: true, messages: [], value: "" },
          amountImportedDistributed: { isValid: true, messages: [], value: "" },
          batchCodes: { isValid: true, messages: [], value: "" },
          bestBefore: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
          brand: { isValid: true, messages: [], value: "" },
          companies: {
            isValid: true,
            messages: [],
            value: { "123-abc": { name: "valid" } },
          },
          displayUntil: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
          originCountry: { isValid: true, messages: [], value: "17" },
          packSize: { isValid: true, messages: [], value: "" },
          packageDescription: { isValid: true, messages: [], value: "" },
          productName: { isValid: true, messages: [], value: "valid" },
          productType: { isValid: true, messages: [], value: "" },
          unitType: { isValid: true, messages: [], value: "" },
          useBy: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
        },
      },
    ],
    [
      "happiest path",
      {
        fields: {
          productName: "valid",
          brand: "valid",
          companies: {
            "123-abc": {
              name: "valid",
            },
          },
          originCountry: "17",
        },
        options: {
          isCreate: false,
        },
      },
      {
        isValid: true,
        validatedFields: {
          additionalInformation: { isValid: true, messages: [], value: "" },
          amountImportedDistributed: { isValid: true, messages: [], value: "" },
          batchCodes: { isValid: true, messages: [], value: "" },
          bestBefore: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
          brand: { isValid: true, messages: [], value: "valid" },
          companies: {
            isValid: true,
            messages: [],
            value: { "123-abc": { name: "valid" } },
          },
          displayUntil: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
          originCountry: { isValid: true, messages: [], value: "17" },
          packSize: { isValid: true, messages: [], value: "" },
          packageDescription: { isValid: true, messages: [], value: "" },
          productName: { isValid: true, messages: [], value: "valid" },
          productType: { isValid: true, messages: [], value: "" },
          unitType: { isValid: true, messages: [], value: "" },
          useBy: {
            day: "",
            human: "",
            isValid: true,
            iso: "",
            messages: [],
            month: "",
            value: "",
            year: "",
          },
        },
      },
    ],
  ];

  ["en", "cy"].forEach((languageCode) => {
    test.each(testCases(languageCode))(
      `%s - ${languageCode}`,
      (description, { fields, options }, expected) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        expect(validate(fields, i18n, options.isCreate)).toEqual(expected);
      }
    );
  });
});
