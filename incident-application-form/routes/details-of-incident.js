const express = require("express");
const { validate } = require("../lib/validation/details-of-incident");

const router = express.Router();

const template = "details-of-incident";

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
    back: routes.YOUR_DETAILS,
    detailsOfIncident: req.session.detailsOfIncident || {},
    i18n,
    routes,
  });
});

router.post("/", async function (req, res, next) {
  const {
    "incident-title": incidentTitle,
    "nature-of-problem": natureOfProblem,
    "action-taken": actionTaken,
    "distribution-details": distributionDetails,
    "illness-details": illnessDetails,
    "local-authority-notified": localAuthorityNotified,
    "additional-information": additionalInformation,
  } = req.body;

  const validation = validate(
    {
      incidentTitle,
      natureOfProblem,
      actionTaken,
      distributionDetails,
      illnessDetails,
      localAuthorityNotified,
      additionalInformation,
    },
    i18n
  );

  if (!validation.isValid) {
    res.render(template, {
      back: routes.YOUR_DETAILS,
      detailsOfIncident: req.session.detailsOfIncident || {},
      i18n,
      validation,
      routes,
    });
    return;
  }

  // the valid form submission data
  // console.log(`validation`, validation.validatedFields);

  req.session.detailsOfIncident = validation.validatedFields;

  res.redirect(routes.DETAILS_OF_PRODUCT);
});

module.exports = router;
