const { allValid } = require("./all-valid");
const { validateContactName } = require("./contact-name");
const { validateNotifierType } = require("./notifier-type");
const { validatePosition } = require("./position");
const { validateOrganisation } = require("./organisation");
const { validateEmail } = require("./email");
const { validateTelephone1 } = require("./telephone1");
const { validateAddressLine1 } = require("./address.line1");
const { validateAddressLine2 } = require("./address.line2");
const { validateAddressTown } = require("./address.town");
const { validateAddressCounty } = require("./address.county");
const { validateAddressPostcode } = require("./address.postcode");
const { validateAddressCountry } = require("./address.country");

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
    const validatedTelephone1 = validateTelephone1(email, i18n);
    const validatedAddressLine1 = validateAddressLine1(email, i18n);
    const validatedAddressLine2 = validateAddressLine2(email, i18n);
    const validatedAddressTown = validateAddressTown(email, i18n);
    const validatedAddressCounty = validateAddressCounty(email, i18n);
    const validatedAddressPostcode = validateAddressPostcode(email, i18n);
    const validatedAddressCountry = validateAddressCountry(email, i18n);

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
    };
  },
};
