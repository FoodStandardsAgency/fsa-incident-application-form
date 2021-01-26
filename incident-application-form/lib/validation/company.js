const { allValid } = require("./all-valid");
const { validateCompanyName } = require("./individual-fields/company-name");
const { validateCompanyType } = require("./individual-fields/company-type");
const { validateContactName } = require("./individual-fields/contact-name");
const { validateEmail } = require("./individual-fields/email");
const { validateTelephone1 } = require("./individual-fields/telephone1");
const { validateAddressLine1 } = require("./individual-fields/address.line1");
const { validateAddressLine2 } = require("./individual-fields/address.line2");
const { validateAddressTown } = require("./individual-fields/address.town");
const { validateAddressCounty } = require("./individual-fields/address.county");
const {
  validateAddressPostcode,
} = require("./individual-fields/address.postcode");
const {
  validateAddressCountry,
} = require("./individual-fields/address.country");
const isEmptyFn = require("./is-empty");

module.exports = {
  validate: (
    {
      companyName,
      companyType,
      contactName,
      email,
      telephone1,
      addressLine1,
      addressLine2,
      addressTown,
      addressCounty,
      addressPostcode,
      addressCountry,
    },
    i18n
  ) => {
    const validatedCompanyName = validateCompanyName(companyName, i18n);
    const validatedCompanyType = validateCompanyType(companyType, i18n);
    const validatedContactName = validateContactName(contactName, i18n, {
      required: false,
    });
    const validatedEmail = validateEmail(email, i18n);
    const validatedTelephone1 = validateTelephone1(telephone1, i18n, {
      required: false,
    });
    const validatedAddressLine1 = validateAddressLine1(addressLine1, i18n);
    const validatedAddressLine2 = validateAddressLine2(addressLine2, i18n);
    const validatedAddressTown = validateAddressTown(addressTown, i18n, {
      required: false,
    });
    const validatedAddressCounty = validateAddressCounty(addressCounty, i18n);
    const validatedAddressPostcode = validateAddressPostcode(
      addressPostcode,
      i18n
    );
    const validatedAddressCountry = validateAddressCountry(
      addressCountry,
      i18n,
      {
        required: false,
      }
    );

    const isValid = allValid([
      validatedCompanyName,
      validatedCompanyType,
      validatedContactName,
      validatedEmail,
      validatedTelephone1,
      validatedAddressLine1,
      validatedAddressLine2,
      validatedAddressTown,
      validatedAddressCounty,
      validatedAddressPostcode,
      validatedAddressCountry,
    ]);

    const isEmpty = isEmptyFn([
      companyName,
      companyType !== "0" ? companyType : undefined,
      contactName,
      email,
      telephone1,
      addressLine1,
      addressLine2,
      addressTown,
      addressCounty,
      addressPostcode,
      addressCountry !== "0" ? addressCountry : undefined,
    ]);

    return {
      isValid,
      validatedFields: {
        ...validatedCompanyName,
        ...validatedCompanyType,
        ...validatedContactName,
        ...validatedEmail,
        ...validatedTelephone1,
        address: {
          ...validatedAddressLine1,
          ...validatedAddressLine2,
          ...validatedAddressTown,
          ...validatedAddressCounty,
          ...validatedAddressPostcode,
          ...validatedAddressCountry,
        },
      },
      isEmpty,
    };
  },
};
