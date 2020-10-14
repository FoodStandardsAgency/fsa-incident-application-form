const express = require("express");
const { validate } = require("../lib/validation/your-details");

const router = express.Router();

const template = "your-details";

const languageCode = "cy";
const translations = require(`${__dirname}/../translations/${template}.json`);

const title = translations.title[languageCode];

const i18n = {
  languageCode,
  ...translations,
};

router.get("/", function (req, res, next) {
  res.render(template, { title, i18n });
});

router.post("/", function (req, res, next) {
  const {
    "notifier-type": notifierType,
    "contact-name": contactName,
    position,
    organisation,
  } = req.body;

  const validation = validate(
    { notifierType, contactName, position, organisation },
    i18n
  );

  if (!validation.isValid) {
    res.render(template, {
      title,
      validation,
      i18n,
    });
    return;
  }

  // the valid form submission data
  console.log(`validation`, validation.validatedFields);

  res.render(template, { title, i18n });
});

module.exports = router;
