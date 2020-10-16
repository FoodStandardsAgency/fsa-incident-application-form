const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { validate } = require("../lib/validation/company");

const router = express.Router({ mergeParams: true });

const languageCode = "en";
const pageTranslations = require(`${__dirname}/../translations/company.json`);
const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const i18n = {
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
};

router.get("/", async function (req, res, next) {
  const template = "add-company";
  const { productId } = req.params;

  res.render(template, {
    companyId: uuidv4(),
    i18n,
    productId,
    routes,
    template,
  });
});

router.post("/", async function (req, res, next) {
  const {
    template,
    companyId,
    productId,
    "company-name": companyName,
  } = req.body;

  const validation = validate(
    {
      companyName,
    },
    i18n
  );

  const { products } = req.session;

  if (!products) {
    throw new Error("Cannot add a company if no product.");
  }

  if (!validation.isValid) {
    res.render(template, {
      i18n,
      productId,
      routes,
      template,
    });
    return;
  }

  const validatedCompanies = products[productId].companies || {};
  validatedCompanies[companyId] = validation.validatedFields;

  req.session.products = {
    ...req.session.products,
    [productId]: {
      ...req.session.products[productId],
      companies: validatedCompanies,
    },
  };

  // the valid form submission data
  console.log(`validation`, validation.validatedFields);

  res.redirect(`${routes.PRODUCT}/edit/${productId}`);
});

router.get("/edit/:companyId", async function (req, res, next) {
  const template = "edit-company";

  const { productId, companyId } = req.params;
  const validation = {
    validatedFields: req.session.products[productId].companies[companyId],
  };

  res.render(template, {
    i18n,
    companyId,
    productId,
    routes,
    template,
    validation,
  });
});

router.get("/remove/:companyId", async function (req, res, next) {
  const { productId, companyId } = req.params;

  const { products = {} } = req.session;
  if (
    products[productId] &&
    products[productId].companies &&
    products[productId].companies[companyId]
  ) {
    delete products[productId].companies[companyId];
  }
  req.session.products = products;

  res.redirect(`${routes.PRODUCT}/edit/${productId}`);
});

module.exports = router;
