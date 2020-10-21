const express = require("express");
const router = express.Router();

const template = "complete";

const languageCode = "en";
const pageTranslations = require(`${__dirname}/../translations/${template}.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const i18n = {
  languageCode,
  ...pageTranslations,
};

router.get("/", function (req, res, next) {
  const { referenceNumber } = req.session;

  req.session.destroy();

  res.render("complete", {
    i18n,
    referenceNumber,
    routes,
  });
});

module.exports = router;
