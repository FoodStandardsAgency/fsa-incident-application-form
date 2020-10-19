const express = require("express");
const {
  formatProducts,
} = require("../lib/formatting/details-of-products-table-display");

const router = express.Router();

const template = "details-of-product";

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
  console.log(`session`, JSON.stringify(req.session, null, 2));

  const tabularDetailsOfProducts = formatProducts(
    req.session.products || {},
    i18n,
    routes
  );

  res.render(template, {
    i18n,
    routes,
    tabularDetailsOfProducts,
  });
});

router.post("/", async function (req, res, next) {
  res.redirect(routes.PREVIEW);
});

module.exports = router;
