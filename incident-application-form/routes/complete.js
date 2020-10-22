const express = require("express");
const router = express.Router();

const template = "complete";

const pageTranslations = require(`${__dirname}/../translations/${template}.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const getI18n = (languageCode) => ({
  languageCode,
  ...pageTranslations,
});

router.get("/", function (req, res, next) {
  const { referenceNumber } = req.session;

  req.session.destroy();

  res.render("complete", {
    i18n: getI18n(req.locale),
    referenceNumber,
    routes,
  });
});

module.exports = router;
