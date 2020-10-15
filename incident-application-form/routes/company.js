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
  // console.log(`i18n`, i18n);
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
  console.log(`req.body`, req.body);
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

  const companiesToValidate = {
    ...products[productId].companies,
  };
  prod;

  if (!validation.isValid) {
    console.log(`not validation`, validation);

    res.render(template, {
      i18n,
      productId,
      routes,
      template,
    });
    return;
  }

  uctsToValidate[productId] = validation.validatedFields;

  // the valid form submission data
  console.log(`validation`, validation.validatedFields);

  res.redirect(`${routes.PRODUCT}/edit/${productId}`);
});

module.exports = router;
