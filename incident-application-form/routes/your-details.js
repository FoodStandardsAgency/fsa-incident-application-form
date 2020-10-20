const express = require("express");
const { validate } = require("../lib/validation/your-details");
const { getCountries } = require("../lib/lookups/countries");
const { getNotifierTypes } = require("../lib/lookups/notifier-types");
const {
  getSelectedNotifierTypeFromSession,
} = require("../lib/session/notifier-type");
const {
  getSelectedAddressCountryFromSession,
} = require("../lib/session/address.country");

const router = express.Router();

const template = "your-details";

const languageCode = "en";
const pageTranslations = require(`${__dirname}/../translations/${template}.json`);
const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const i18n = {
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
};

router.get("/", async function (req, res, next) {
  const addressCountry = getSelectedAddressCountryFromSession(req.session);
  const notifierType = getSelectedNotifierTypeFromSession(req.session);

  const [countries, notifierTypes] = await Promise.all([
    await getCountries(languageCode, addressCountry),
    await getNotifierTypes(languageCode, notifierType),
  ]);

  res.render(template, {
    countries,
    i18n,
    notifierTypes,
    yourDetails: req.session.yourDetails || {},
  });
});

router.post("/", async function (req, res, next) {
  const {
    "notifier-type": notifierType,
    "contact-name": contactName,
    position,
    organisation,
    email,
    telephone1,
    "address.line1": addressLine1,
    "address.line2": addressLine2,
    "address.town": addressTown,
    "address.county": addressCounty,
    "address.postcode": addressPostcode,
    "address.country": addressCountry,
  } = req.body;

  const validation = validate(
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
  );

  req.session.yourDetails = validation.validatedFields;

  if (!validation.isValid) {
    const [countries, notifierTypes] = await Promise.all([
      await getCountries(languageCode, addressCountry),
      await getNotifierTypes(languageCode, notifierType),
    ]);

    res.render(template, {
      countries,
      i18n,
      notifierTypes,
      validation,
      yourDetails: req.session.yourDetails || {},
    });
    return;
  }

  // the valid form submission data
  // console.log(`validation`, validation.validatedFields);

  res.redirect(routes.DETAILS_OF_INCIDENT);
});

module.exports = router;
