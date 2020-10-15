const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { validate } = require("../lib/validation/add-product");

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

router.get("/", async function (req, res, next) {
  const template = "add-product";

  // console.log(`i18n`, i18n);
  console.log(`session`, req.session);
  res.render(template, {
    i18n,
    id: uuidv4(),
    routes,
    template,
  });
});

router.post("/", async function (req, res, next) {
  console.log(`req.body`, req.body);

  const { id, template, "product-name": productName, brand } = req.body;

  const validation = validate({ productName, brand }, i18n);

  const { products = {} } = req.session;
  const productsToValidate = {
    ...products,
  };
  productsToValidate[id] = validation.validatedFields;

  console.log(`session`, JSON.stringify(req.session, null, 2));

  if (!validation.isValid) {
    console.log(`not validation`, validation);

    res.render(template, {
      i18n,
      validation,
      routes,
      template,
    });
    return;
  }

  req.session.products = productsToValidate;

  // the valid form submission data
  console.log(`validation`, validation.validatedFields);

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
    id: productId,
    routes,
    template,
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
