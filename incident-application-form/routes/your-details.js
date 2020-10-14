const express = require("express");
const { body, validationResult } = require("express-validator");

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

router.post("/", [
  body(
    "notifier-type",
    i18n.notifierType.validation.required[i18n.languageCode]
  )
    .trim()
    .notEmpty()
    .escape(),
  body("contact-name", "Contact name is required")
    .trim()
    .isLength(1, 100)
    .escape(),

  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render(template, {
        title,
        errors: errors.mapped(),
        i18n,
      });
      return;
    }

    // the valid form submission data
    console.log(`req`, req.body);

    res.render(template, { title, i18n });
  },
]);

module.exports = router;
