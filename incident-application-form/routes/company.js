const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { validate } = require("../lib/validation/company");
const { getCompanyTypes } = require("../lib/lookups/company-types");
const { getCountries } = require("../lib/lookups/countries");
const {
  getErrorSummaryFromValidation,
} = require("../lib/validation/error-summary");
const { localisePath } = require("../lib/path-to-localised-path");
const formSubmitChoices = require("../lib/form-submit-choices");

const router = express.Router({ mergeParams: true });

const pageTranslations = require(`${__dirname}/../translations/company.json`);
const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);

const routes = require(`${__dirname}/../routes/routes.json`);

const getI18n = (languageCode) => ({
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
});

router.get("/", async function (req, res, next) {
  const template = "add-company";
  const { productId } = req.params;

  const [companyTypes, countries] = await Promise.all([
    await getCompanyTypes(req.locale),
    await getCountries(req.locale),
  ]);

  res.render(template, {
    companyId: uuidv4(),
    companyTypes,
    countries,
    i18n: getI18n(req.locale),
    productId,
    routes,
    template,
  });
});

router.post("/", async function (req, res, next) {
  const { locale } = req;
  const i18n = getI18n(req.locale);

  const {
    template,
    companyId,
    productId,
    "company-name": companyName,
    "company-type": companyType,
    "contact-name": contactName,
    email,
    telephone1,
    "address.line1": addressLine1,
    "address.line2": addressLine2,
    "address.town": addressTown,
    "address.county": addressCounty,
    "address.postcode": addressPostcode,
    "address.country": addressCountry,
    "submission-type": submissionType,
  } = req.body;

  const validation = validate(
    {
      companyName,
      companyType,
      contactName,
      email,
      telephone1,
      addressLine1,
      addressLine2,
      addressTown,
      addressCounty,
      addressPostcode,
      addressCountry,
    },
    i18n
  );

  const { products } = req.session;

  if (!products) {
    throw new Error("Cannot add a company if no product.");
  }

  const productPath = `/${routes.PRODUCT}/edit/${productId}`;

  if (validation.isEmpty && submissionType === formSubmitChoices.PREVIOUS) {
    res.redirect(localisePath(productPath, req.locale));
    return;
  }

  const [companyTypes, countries] = await Promise.all([
    await getCompanyTypes(locale, companyType),
    await getCountries(locale, addressCountry),
  ]);

  if (!validation.isValid) {
    res.render(template, {
      i18n,
      companyId,
      companyTypes,
      countries,
      errorSummary: getErrorSummaryFromValidation(validation),
      productId,
      routes,
      template,
      validation,
    });
    return;
  }

  const validatedCompanies = products[productId].companies.value || {};
  validatedCompanies[companyId] = validation.validatedFields;

  req.session.products = {
    ...req.session.products,
    [productId]: {
      ...req.session.products[productId],
      companies: {
        ...req.session.products[productId].companies,
        value: validatedCompanies,
      },
    },
  };

  res.redirect(localisePath(productPath, locale));
});

router.get("/edit/:companyId", async function (req, res, next) {
  const template = "edit-company";

  const { productId, companyId } = req.params;

  const validation = {
    validatedFields: req.session.products[productId].companies.value,
  };

  const selectedCompanyType =
    validation.validatedFields[companyId].companyType.value;
  const selectedCountry =
    validation.validatedFields[companyId].address.country.value;

  const [companyTypes, countries] = await Promise.all([
    await getCompanyTypes(req.locale, selectedCompanyType),
    await getCountries(req.locale, selectedCountry),
  ]);

  res.render(template, {
    i18n: getI18n(req.locale),
    companyId,
    companyTypes,
    countries,
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
    products[productId].companies.value &&
    products[productId].companies.value[companyId]
  ) {
    delete products[productId].companies.value[companyId];
  }
  req.session.products = products;

  res.redirect(
    localisePath(`/${routes.PRODUCT}/edit/${productId}`, req.locale)
  );
});

module.exports = router;
