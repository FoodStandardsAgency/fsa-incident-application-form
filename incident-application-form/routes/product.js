const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { validate } = require("../lib/validation/product");
const {
  formatCompanies,
} = require("../lib/formatting/details-of-companies-table-display");
const { getCountries } = require("../lib/lookups/countries");
const {
  getProductCompaniesFromSession,
} = require("../lib/session/product-companies");
const {
  getSelectedProductTypeFromSession,
} = require("../lib/session/product-type");
const { getProductTypes } = require("../lib/lookups/product-types");
const { getUnits } = require("../lib/lookups/units");
const { getSelectedUnitTypeFromSession } = require("../lib/session/unit-type");
const {
  getSelectedOriginCountryFromSession,
} = require("../lib/session/origin-country");

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

  const [originCountries, productTypes, units] = await Promise.all([
    getCountries(languageCode),
    getProductTypes(languageCode),
    getUnits(languageCode),
  ]);

  res.render(template, {
    i18n,
    originCountries,
    productId: uuidv4(),
    productTypes,
    routes,
    SUBMISSION_TYPES,
    template,
    units,
  });
});

router.post("/", async function (req, res, next) {
  const {
    "additional-information": additionalInformation,
    "amount-imported-distributed": amountImportedDistributed,
    "batch-codes": batchCodes,
    "best-before-day": bestBeforeDay,
    "best-before-month": bestBeforeMonth,
    "best-before-year": bestBeforeYear,
    brand,
    "display-until-day": displayUntilDay,
    "display-until-month": displayUntilMonth,
    "display-until-year": displayUntilYear,
    "origin-country": originCountry,
    "pack-size": packSize,
    "package-description": packageDescription,
    "product-name": productName,
    "product-type": productType,
    productId,
    "submission-type": submissionType,
    template,
    "unit-type": unitType,
    "use-by-day": useByDay,
    "use-by-month": useByMonth,
    "use-by-year": useByYear,
  } = req.body;

  const validation = validate(
    {
      additionalInformation,
      amountImportedDistributed,
      batchCodes,
      bestBefore: {
        day: bestBeforeDay,
        month: bestBeforeMonth,
        year: bestBeforeYear,
      },
      brand,
      companies: getProductCompaniesFromSession(req.session, productId),
      displayUntil: {
        day: displayUntilDay,
        month: displayUntilMonth,
        year: displayUntilYear,
      },
      originCountry,
      packSize,
      packageDescription,
      productName,
      productType,
      unitType,
      useBy: {
        day: useByDay,
        month: useByMonth,
        year: useByYear,
      },
    },
    i18n
  );

  if (!validation.isValid) {
    const [productTypes, originCountries, units] = await Promise.all([
      getProductTypes(languageCode, productType),
      getCountries(languageCode, originCountry),
      getUnits(languageCode, unitType),
    ]);

    res.render(template, {
      tabularDetailsOfCompanies: formatCompanies(
        getProductCompaniesFromSession(req.session, productId),
        productId,
        i18n,
        routes
      ),
      i18n,
      productId,
      productTypes,
      originCountries,
      routes,
      SUBMISSION_TYPES,
      template,
      validation,
      units,
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

  const selectedProductType = getSelectedProductTypeFromSession(
    req.session,
    productId
  );
  const selectedOriginCountry = getSelectedOriginCountryFromSession(
    req.session,
    productId
  );
  const selectedUnitType = getSelectedUnitTypeFromSession(
    req.session,
    productId
  );

  const [productTypes, originCountries, units] = await Promise.all([
    getProductTypes(languageCode, selectedProductType),
    getCountries(languageCode, selectedOriginCountry),
    getUnits(languageCode, selectedUnitType),
  ]);

  const validation = {
    validatedFields: req.session.products[productId],
  };

  res.render(template, {
    tabularDetailsOfCompanies: formatCompanies(
      getProductCompaniesFromSession(req.session, productId),
      productId,
      i18n,
      routes
    ),
    i18n,
    originCountries,
    productId,
    productTypes,
    routes,
    SUBMISSION_TYPES,
    template,
    validation,
    units,
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
