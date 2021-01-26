const { allValid } = require("./all-valid");
const { validateContactName } = require("./individual-fields/contact-name");
const { validateNotifierType } = require("./individual-fields/notifier-type");
const { validatePosition } = require("./individual-fields/position");
const { validateOrganisation } = require("./individual-fields/organisation");
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
      notifierType,
      contactName,
      position,
      organisation,
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
    const validatedContactName = validateContactName(contactName, i18n);
    const validatedNotifierType = validateNotifierType(notifierType, i18n);
    const validatedPosition = validatePosition(position, i18n);
    const validatedOrganisation = validateOrganisation(organisation, i18n);
    const validatedEmail = validateEmail(email, i18n);
    const validatedTelephone1 = validateTelephone1(telephone1, i18n);
    const validatedAddressLine1 = validateAddressLine1(addressLine1, i18n);
    const validatedAddressLine2 = validateAddressLine2(addressLine2, i18n);
    const validatedAddressTown = validateAddressTown(addressTown, i18n);
    const validatedAddressCounty = validateAddressCounty(addressCounty, i18n);
    const validatedAddressPostcode = validateAddressPostcode(
      addressPostcode,
      i18n
    );
    const validatedAddressCountry = validateAddressCountry(
      addressCountry,
      i18n
    );

    const isValid = allValid([
      validatedContactName,
      validatedNotifierType,
      validatedPosition,
      validatedOrganisation,
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
      notifierType,
      contactName,
      position,
      organisation,
      email,
      telephone1,
      addressLine1,
      addressLine2,
      addressTown,
      addressCounty,
      addressPostcode,
      addressCountry,
    ]);

    return {
      isValid,
      validatedFields: {
        ...validatedContactName,
        ...validatedNotifierType,
        ...validatedPosition,
        ...validatedOrganisation,
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
