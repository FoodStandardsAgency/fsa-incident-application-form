const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const template = "your-details";

const languageCode = "cy";

const i18n = require(`${__dirname}/../translations/${template}.${languageCode}.json`);

const title = i18n.title;

router.get("/", function (req, res, next) {
  res.render(template, { title, i18n });
});

router.post("/", [
  body("notifier-type", "Notifier type is required").trim().notEmpty().escape(),
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
