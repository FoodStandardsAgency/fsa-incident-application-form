var express = require("express");
var router = express.Router();

const template = "index";

const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);
const pageTranslations = require(`${__dirname}/../translations/${template}.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const getI18n = (languageCode) => ({
  languageCode,
  ...formFieldTranslations,
  ...pageTranslations,
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    i18n: getI18n(req.locale),
    routes,
  });
});

module.exports = router;
