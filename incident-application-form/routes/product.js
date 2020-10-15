const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { validate } = require("../lib/validation/product");

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

  // console.log(`i18n`, i18n);
  console.log(`session`, req.session);
  res.render(template, {
    i18n,
    productId: uuidv4(),
    routes,
    SUBMISSION_TYPES,
    template,
  });
});

router.post("/", async function (req, res, next) {
  console.log(`req.body`, req.body);

  const {
    productId,
    template,
    "submission-type": submissionType,
    "product-name": productName,
    brand,
  } = req.body;

  const validation = validate({ productName, brand }, i18n);

  console.log(`session`, JSON.stringify(req.session, null, 2));

  if (!validation.isValid) {
    console.log(`not validation`, validation);

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
  validatedProducts[productId] = validation.validatedFields;

  req.session.products = validatedProducts;

  // the valid form submission data
  console.log(`validation`, validation.validatedFields);

  if (submissionType === SUBMISSION_TYPES.ADD_COMPANY) {
    res.redirect(`${routes.PRODUCT}/${productId}/company`);
    return;
  }

  res.redirect(routes.DETAILS_OF_PRODUCT);
});

router.get("/edit/:productId", async function (req, res, next) {
  // console.log(`i18n`, i18n);
  const template = "edit-product";

  const { productId } = req.params;
  const validation = {
    validatedFields: req.session.products[productId],
  };

  console.log(`session`, JSON.stringify(req.session, null, 2));

  console.log(`validation`, validation);

  res.render(template, {
    i18n,
    productId,
    routes,
    template,
    SUBMISSION_TYPES,
    validation,
  });
});

router.get("/remove/:productId", async function (req, res, next) {
  // console.log(`i18n`, i18n);
  const { productId } = req.params;

  const { products = {} } = req.session;
  if (products[productId]) {
    delete products[productId];
  }
  req.session.products = products;

  console.log(
    `REMOVAL session`,
    productId,
    JSON.stringify(req.session, null, 2)
  );
  res.redirect(routes.DETAILS_OF_PRODUCT);
});

module.exports = router;
