const express = require("express");
const { validate } = require("../lib/validation/your-details");
const { getCountries } = require("../lib/lookups/countries");
const { getNotifierTypes } = require("../lib/lookups/notifier-types");

const router = express.Router();

const template = "your-details";

const languageCode = "en";
const pageTranslations = require(`${__dirname}/../translations/${template}.json`);
const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const i18n = (languageCode) => ({
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
});

router.get("/", async function (req, res, next) {
  let lc = req.query.l ? req.query.l : languageCode;
  if (lc !== "cy") {
    lc = "en";
  }

  res.render(template, {
    countries: await getCountries(languageCode),
    i18n: i18n(lc),
    notifierTypes: await getNotifierTypes(languageCode),
    yourDetails: req.session.yourDetails || {},
  });
});

router.post("/", async function (req, res, next) {
  let lc = req.query.l ? req.query.l : languageCode;
  if (lc !== "cy") {
    lc = "en";
  }

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
      i18n: i18n(lc),
      notifierTypes: await getNotifierTypes(languageCode),
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
