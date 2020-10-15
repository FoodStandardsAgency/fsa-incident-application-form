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
  console.log(`req.session`, req.session);
  res.render(template, {
    back: routes.YOUR_DETAILS,
    i18n,
    routes,
  });
});

router.post("/", async function (req, res, next) {
  console.log(`req.body`, req.body);
  const {
    "nature-of-problem": natureOfProblem,
    "action-taken": actionTaken,
    "distribution-details": distributionDetails,
    "illness-details": illnessDetails,
    "local-authority-notified": localAuthorityNotified,
    "additional-information": additionalInformation,
  } = req.body;

  const validation = validate(
    {
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
    console.log(`not validation`, validation);

    res.render(template, {
      back: routes.YOUR_DETAILS,
      i18n,
      validation,
      routes,
    });
    return;
  }

  // the valid form submission data
  console.log(`validation`, validation.validatedFields);

  req.session.detailsOfIncident = validation.validatedFields;

  res.render(template, {
    i18n,
  });
});

module.exports = router;
