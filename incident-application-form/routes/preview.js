const express = require("express");

const { assemblePayload } = require("../lib/formatting/final-payload-assembly");
const { validate } = require("../lib/validation/your-details");
const { getCompanyTypes } = require("../lib/lookups/company-types");
const { getCountries } = require("../lib/lookups/countries");
const { getNotifierTypes } = require("../lib/lookups/notifier-types");
const { getProductTypes } = require("../lib/lookups/product-types");
const { getUnits } = require("../lib/lookups/units");
const { generateReferenceId } = require("../lib/reference-id-generator");
const { localisePath } = require("../lib/path-to-localised-path");
const sendConfirmationEmail = require("../lib/email/send-confirmation-email");
const sendNotificationEmail = require("../lib/email/send-notification-email");
const payloadSubmission = require("../lib/payload-submission");

const router = express.Router();

const template = "preview";

const pageTranslations = require(`${__dirname}/../translations/${template}.json`);
const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const getI18n = (languageCode) => ({
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
});

router.get("/", async function (req, res, next) {
  const [
    companyTypes,
    countries,
    notifierTypes,
    productTypes,
    units,
  ] = await Promise.all([
    getCompanyTypes(req.locale),
    getCountries(req.locale),
    getNotifierTypes(req.locale),
    getProductTypes(req.locale, 1),
    getUnits(req.locale, 1),
  ]);

  res.render(template, {
    i18n: getI18n(req.locale),
    companyTypes,
    countries,
    detailsOfIncident: req.session.detailsOfIncident || {},
    notifierTypes,
    products: req.session.products || {},
    productTypes,
    routes,
    units,
    yourDetails: req.session.yourDetails || {},
  });
});

router.post("/", async function (req, res, next) {
  if (
    !req.session.yourDetails ||
    !req.session.detailsOfIncident ||
    !req.session.products
  ) {
    res.redirect(localisePath(`/${routes.YOUR_DETAILS}`, req.locale));
    return;
  }

  req.session.referenceNumber = generateReferenceId();

  // post this off to Rainmaker
  const payload = assemblePayload(req.session);

    console.log(payload);
  await payloadSubmission(payload);

  try {
    await sendConfirmationEmail(payload);
  } catch (e) {
    console.warn("sendConfirmationEmail failed", e);
  }

  try {
    await sendNotificationEmail(payload);
  } catch (e) {
    console.warn("sendNotificationEmail failed", e);
  }

  res.redirect(localisePath(`/${routes.COMPLETE}`, req.locale));
});

module.exports = router;
