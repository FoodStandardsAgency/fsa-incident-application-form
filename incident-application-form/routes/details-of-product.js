const express = require("express");
const {
  formatProducts,
} = require("../lib/formatting/details-of-products-table-display");

const { localisePath } = require("../lib/path-to-localised-path");

const router = express.Router();

const template = "details-of-product";

const pageTranslations = require(`${__dirname}/../translations/${template}.json`);
const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const getI18n = (languageCode) => ({
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
});

router.get("/", async function (req, res, next) {
  const tabularDetailsOfProducts = formatProducts(
    req.session.products || {},
    getI18n(req.locale),
    routes
  );

  res.render(template, {
    i18n: getI18n(req.locale),
    routes,
    tabularDetailsOfProducts,
  });
});

router.post("/", async function (req, res, next) {
  res.redirect(localisePath(`/${routes.PREVIEW}`, req.locale));
});

module.exports = router;
