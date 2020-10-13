const express = require("express");
const { validate } = require("../lib/validation/your-details");

const router = express.Router();

const template = "your-details";

const languageCode = "cy";
const translations = require(`${__dirname}/../translations/${template}.json`);

const i18n = {
  languageCode,
  ...translations,
};

router.get("/", async function (req, res, next) {
  const notifierTypes = await fetch("/lookup/notifierType");
  console.log(`not`, notifierTypes);
  res.render(template, { i18n });
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
      validation,
      i18n,
    });
    return;
  }

  // the valid form submission data
  console.log(`validation`, validation.validatedFields);

  res.render(template, { i18n });
});

module.exports = router;
