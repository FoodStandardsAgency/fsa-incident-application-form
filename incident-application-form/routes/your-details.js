const express = require("express");
const { validate } = require("../lib/validation/your-details");
const { getCountries } = require("../lib/lookups/countries");
const { getNotifierTypes } = require("../lib/lookups/notifier-types");

const router = express.Router();

const template = "your-details";

const languageCode = "en";
const pageTranslations = require(`${__dirname}/../translations/${template}.json`);
const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);

const i18n = {
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
};

router.get("/", async function (req, res, next) {
  console.log(`req.session`, req.session);
  res.render(template, {
    countries: await getCountries(languageCode),
    i18n,
    notifierTypes: await getNotifierTypes(languageCode),
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
    res.render(template, {
      countries: await getCountries(languageCode),
      i18n,
      notifierTypes: await getNotifierTypes(languageCode),
      validation,
      yourDetails: req.session.yourDetails || {},
    });
    return;
  }

  // the valid form submission data
  console.log(`validation`, validation.validatedFields);

  res.render(template, {
    countries: await getCountries(languageCode),
    i18n,
    notifierTypes: await getNotifierTypes(languageCode),
    yourDetails: req.session.yourDetails || {},
  });
});

module.exports = router;
