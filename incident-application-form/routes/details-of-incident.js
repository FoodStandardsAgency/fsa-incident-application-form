const express = require("express");
const { validate } = require("../lib/validation/details-of-incident");
const {
  getErrorSummaryFromValidation,
} = require("../lib/validation/error-summary");
const { localisePath } = require("../lib/path-to-localised-path");
const formSubmitChoices = require("../lib/form-submit-choices");

const router = express.Router();

const template = "details-of-incident";

const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);
const pageTranslations = require(`${__dirname}/../translations/${template}.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const previousPage = `/${routes.YOUR_DETAILS}`;
const nextPage = `/${routes.DETAILS_OF_PRODUCT}`;

const getI18n = (languageCode) => ({
  languageCode,
  ...formFieldTranslations,
  ...pageTranslations,
});

router.get("/", async function (req, res, next) {
  res.render(template, {
    detailsOfIncident: req.session.detailsOfIncident || {},
    i18n: getI18n(req.locale),
    routes,
  });
});

router.post("/", async function (req, res, next) {
  const {
    "submit-action": submitAction,
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
    getI18n(req.locale)
  );

  if (validation.isEmpty && submitAction === formSubmitChoices.PREVIOUS) {
    res.redirect(localisePath(previousPage, req.locale));
    return;
  }

  if (!validation.isValid) {
    res.render(template, {
      detailsOfIncident: validation.validatedFields || {},
      errorSummary: getErrorSummaryFromValidation(validation),
      i18n: getI18n(req.locale),
      validation,
      routes,
    });
    return;
  }

  req.session.detailsOfIncident = validation.validatedFields;

  const redirectTo =
    submitAction === formSubmitChoices.PREVIOUS ? previousPage : nextPage;

  res.redirect(localisePath(redirectTo, req.locale));
});

module.exports = router;
