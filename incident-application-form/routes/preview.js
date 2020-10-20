const express = require("express");
const { assemblePayload } = require("../lib/formatting/final-payload-assembly");
const { validate } = require("../lib/validation/your-details");
const { getCountries } = require("../lib/lookups/countries");
const { getNotifierTypes } = require("../lib/lookups/notifier-types");
const send = require("../lib/email/send");

const router = express.Router();

const template = "preview";

const languageCode = "en";
const pageTranslations = require(`${__dirname}/../translations/${template}.json`);
const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const i18n = {
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
};

const sendConfirmationEmail = async (data) => {
  const email = data.yourDetails.email.value;
  const personalisation = {
    contactName: data.yourDetails.contactName.value,
    referenceNumber: '//TODO auto generate a reference number',
  };
  await send('en-confirmation-email', email, personalisation);
};

const sendNotificationEmail = async (data) => {
  const email = process.env.NOTIFICATION_EMAIL;
  const personalisation = {
    contactName: data.yourDetails.contactName.value,
    referenceNumber: '//TODO auto generate a reference number',
  };
  await send('en-notification-email', email, personalisation);
};


router.get("/", async function (req, res, next) {
  res.render(template, {
    i18n,
    yourDetails: req.session.yourDetails || {},
    detailsOfIncident: req.session.detailsOfIncident || {},
    routes,
  });
});

router.post("/", async function (req, res, next) {

  await sendConfirmationEmail(req.session);
  await sendNotificationEmail(req.session);

  const payload = assemblePayload(req.session);

  // TODO clear the session here.


  res.render(template, {
    i18n,
    yourDetails: req.session.yourDetails || {},
    detailsOfIncident: req.session.detailsOfIncident || {},
    routes,
    payload: JSON.stringify(payload, null, 2),
  });
});

module.exports = router;
