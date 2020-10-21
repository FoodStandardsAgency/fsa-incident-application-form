var express = require("express");
var router = express.Router();

const template = "index";

const languageCode = "en";
const pageTranslations = require(`${__dirname}/../translations/${template}.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const i18n = {
  languageCode,
  ...pageTranslations,
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    i18n,
    links: [
      {
        url: routes.YOUR_DETAILS,
        text: "Your Details",
      },
      {
        url: routes.DETAILS_OF_INCIDENT,
        text: "Details of Incident",
      },
      {
        url: routes.DETAILS_OF_PRODUCT,
        text: "Details of Product",
      },
      {
        url: routes.PREVIEW,
        text: "Preview",
      },
    ],
    routes,
  });
});

module.exports = router;
