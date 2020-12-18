const express = require("express");
const dot = require("dot-object");

const { assemblePayload } = require("../lib/formatting/final-payload-assembly");
const { validate } = require("../lib/validation/your-details");
const { getCompanyTypes } = require("../lib/lookups/company-types");
const { getCountries } = require("../lib/lookups/countries");
const { getNotifierTypes } = require("../lib/lookups/notifier-types");
const { getProductTypes } = require("../lib/lookups/product-types");
const { getUnits } = require("../lib/lookups/units");
const send = require("../lib/email/send");
const { generateReferenceId } = require("../lib/reference-id-generator");
const { localisePath } = require("../lib/path-to-localised-path");
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

const sendConfirmationEmail = async (data) => {
  const email = data.IncidentStakeholders.Email;
  const personalisation = {
    contactName: data.IncidentStakeholders.Name,
    referenceNumber: data.Incidents.IncidentTitle,
  };
  await send("en-confirmation-email", email, personalisation);
};

const sendNotificationEmail = async (data) => {
  const email = process.env.NOTIFICATION_EMAIL;

  // note - i'm relying on the fact that the payload has been normalised
  // so fields that were ignored in the form should have been pre-populated
  //   with ""s
  // then i'm using 'dot-object' to flatten the non-list bits of data
  // + passing them straight in as the 'personalisation' for govnotify

  // there is an argument to be made for assembling this manually as
  // changes to the payload structure -could- have effects on whether
  // or not we're sending all the required fields to govnotify..
  const easyFields = {
    Addresses: {...data.Addresses},
    Incidents: {...data.Incidents},
    IncidentStakeholders: {...data.IncidentStakeholders},
  }

  const easyFieldsInDotNotation = dot.dot(easyFields);

  const personalisation = {
    contactName: data.IncidentStakeholders.Name,
    referenceNumber: data.Incidents.IncidentTitle,
    ...easyFieldsInDotNotation,
  };
  await send("en-notification-of-incident-email", email, personalisation);
};

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
    getProductTypes(req.locale),
    getUnits(req.locale),
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

  await payloadSubmission(payload);

  await sendConfirmationEmail(payload);
  await sendNotificationEmail(payload);

  res.redirect(localisePath(`/${routes.COMPLETE}`, req.locale));
});

module.exports = router;
