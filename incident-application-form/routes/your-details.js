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

const i18n = {
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
};

router.get("/", async function (req, res, next) {
  console.log(`req.session`, JSON.stringify(req.session, null, 2));

  const notifierTypes = await getNotifierTypes(languageCode);
  const selectedNotifierType =
    (req.session.yourDetails &&
      req.session.yourDetails.notifierType &&
      req.session.yourDetails.notifierType.value) ||
    false;

  const notifierTypesWithSelection = notifierTypes.map((nt) => {
    if (!selectedNotifierType) {
      return nt;
    }

    if (parseInt(selectedNotifierType, 10) === parseInt(nt.value, 10)) {
      return {
        ...nt,
        selected: true,
      };
    }

    return nt;
  });

  const countries = await getCountries(languageCode);
  const selectedCountry =
    (req.session.yourDetails &&
      req.session.yourDetails.address &&
      req.session.yourDetails.address.country &&
      req.session.yourDetails.address.country.value) ||
    false;

  const countriesWithSelection = countries.map((c) => {
    if (!selectedCountry) {
      return c;
    }

    if (parseInt(selectedCountry, 10) === parseInt(c.value, 10)) {
      return {
        ...c,
        selected: true,
      };
    }

    return c;
  });

  console.log(`notifierTypesWithSelection`, notifierTypesWithSelection);
  console.log(`countriesWithSelection`, countriesWithSelection);

  res.render(template, {
    countries: countriesWithSelection,
    i18n,
    notifierTypes: notifierTypesWithSelection,
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
  // console.log(`validation`, validation.validatedFields);

  res.redirect(routes.DETAILS_OF_INCIDENT);
});

module.exports = router;
