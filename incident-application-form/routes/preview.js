const express = require("express");
const { assemblePayload } = require("../lib/formatting/final-payload-assembly");
const { validate } = require("../lib/validation/your-details");
const { getCountries } = require("../lib/lookups/countries");
const { getNotifierTypes } = require("../lib/lookups/notifier-types");

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

router.get("/", async function (req, res, next) {
  res.render(template, {
    i18n,
    yourDetails: req.session.yourDetails || {},
    detailsOfIncident: req.session.detailsOfIncident || {},
    routes,
  });
});

router.post("/", async function (req, res, next) {
  const payload = assemblePayload(req.session);

  res.render(template, {
    i18n,
    yourDetails: req.session.yourDetails || {},
    detailsOfIncident: req.session.detailsOfIncident || {},
    routes,
    payload: JSON.stringify(payload, null, 2),
  });
});

module.exports = router;
