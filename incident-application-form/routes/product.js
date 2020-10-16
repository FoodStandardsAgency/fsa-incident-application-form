const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { validate } = require("../lib/validation/product");
const {
  formatCompanies,
} = require("../lib/formatting/details-of-companies-table-display");

const router = express.Router();

const languageCode = "en";
const pageTranslations = require(`${__dirname}/../translations/product.json`);
const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const i18n = {
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
};

const SUBMISSION_TYPES = {
  ADD_PRODUCT: "add-product",
  ADD_COMPANY: "add-company",
};

router.get("/", async function (req, res, next) {
  const template = "add-product";

  res.render(template, {
    i18n,
    productId: uuidv4(),
    routes,
    SUBMISSION_TYPES,
    template,
  });
});

router.post("/", async function (req, res, next) {
  const {
    productId,
    template,
    "submission-type": submissionType,
    "product-name": productName,
    brand,
  } = req.body;

  const validation = validate({ productName, brand }, i18n);

  if (!validation.isValid) {
    res.render(template, {
      productId,
      i18n,
      validation,
      routes,
      SUBMISSION_TYPES,
      template,
    });
    return;
  }

  const { products = {} } = req.session;
  const validatedProducts = {
    ...products,
  };
  validatedProducts[productId] = {
    ...validatedProducts[productId],
    ...validation.validatedFields,
  };

  req.session.products = validatedProducts;

  // the valid form submission data
  // console.log(`validation`, validation.validatedFields);

  if (submissionType === SUBMISSION_TYPES.ADD_COMPANY) {
    res.redirect(`${routes.PRODUCT}/${productId}/company`);
    return;
  }

  res.redirect(routes.PREVIEW);
});

router.get("/edit/:productId", async function (req, res, next) {
  const template = "edit-product";

  const { productId } = req.params;
  const validation = {
    validatedFields: req.session.products[productId],
  };

  const tabularDetailsOfCompanies = formatCompanies(
    req.session.products[productId].companies || {},
    productId,
    i18n,
    routes
  );

  res.render(template, {
    i18n,
    productId,
    routes,
    tabularDetailsOfCompanies,
    template,
    SUBMISSION_TYPES,
    validation,
  });
});

router.get("/remove/:productId", async function (req, res, next) {
  const { productId } = req.params;

  const { products = {} } = req.session;
  if (products[productId]) {
    delete products[productId];
  }
  req.session.products = products;

  res.redirect(routes.DETAILS_OF_PRODUCT);
});

module.exports = router;
