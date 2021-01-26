const { allValid } = require("./all-valid");
const {
  validateAdditionalInformation,
} = require("./individual-fields/additional-information");
const {
  validateAmountImportedDistributed,
} = require("./individual-fields/amount-imported-distributed");
const { validateBatchCodes } = require("./individual-fields/batch-codes");
const { validateBrand } = require("./individual-fields/brand");
const { validateCompanies } = require("./individual-fields/companies");
const { validateDate } = require("./individual-fields/date");
const {
  validateAddressCountry,
} = require("./individual-fields/address.country");
const { validatePackSize } = require("./individual-fields/pack-size");
const {
  validatePackageDescription,
} = require("./individual-fields/package-description");
const { validateProductName } = require("./individual-fields/product-name");
const { validateProductType } = require("./individual-fields/product-type");
const { validateUnitType } = require("./individual-fields/unit-type");
const isEmptyFn = require("./is-empty");

/**
 * Note: companies are not validated when a product is validated.
 *
 * A product may have 0..n companies. Each company is added to a product on an individual basis.
 *
 * When the company is added / edited, that company is validated at the point of form submission.
 *
 * Validation of any associated company does not happen again every time a product is added / edited.
 *
 * The reasoning for this is that companies should never be saved in an invalid state, so should not need validating
 * here. Also, if a company were invalid, there is no way to associate the errors with the company, as that company
 * is not displayed at the same time as the product.
 *
 * This is definitely confusing, sorry!
 *
 * @type {{validate: (function({additionalInformation?: *, amountImportedDistributed?: *, batchCodes?: *, bestBefore?: *, brand?: *, companies?: *, displayUntil?: *, originCountry?: *, packSize?: *, packageDescription?: *, productName?: *, productType?: *, unitType?: *, useBy?: *}, *=, *=): {isValid: *, isEmpty: *|boolean, validatedFields: {amountImportedDistributed: ({isValid: boolean, messages: [], value: string}|{isValid: boolean, messages: [], value}), additionalInformation: {isValid: boolean, messages: [], value}, packSize: ({isValid: boolean, messages: [], value: string}|{isValid: boolean, messages: [], value}), displayUntil: *, productName: {isValid: boolean, messages: [], value}, unitType: ({isValid: boolean, messages: [], value: string}|{isValid: boolean, messages: [], value}), companies: ({isValid: boolean, isEmpty: boolean, messages: [*], value}|{isValid: boolean, isEmpty: boolean, messages: [], value: *}), packageDescription: ({isValid: boolean, messages: [], value: string}|{isValid: boolean, messages: [], value}), batchCodes: ({isValid: boolean, messages: [], value: string}|{isValid: boolean, messages: [], value}), bestBefore: *, originCountry: {isValid: boolean, messages: [], value: string}|{isValid: boolean, messages: [], value: string}|{isValid: boolean, messages: [], value}|*, useBy: *, brand: ({isValid: boolean, messages: [], value: string}|{isValid: boolean, messages: [], value}), productType: ({isValid: boolean, messages: [], value: string}|{isValid: boolean, messages: [], value})}})}}
 */
module.exports = {
  validate: (
    {
      additionalInformation,
      amountImportedDistributed,
      batchCodes,
      bestBefore,
      brand,
      companies,
      displayUntil,
      originCountry,
      packSize,
      packageDescription,
      productName,
      productType,
      unitType,
      useBy,
    },
    i18n,
    isCreate
  ) => {
    const validatedAdditionalInformation = validateAdditionalInformation(
      additionalInformation,
      i18n
    );
    const validatedAmountImportedDistributed = validateAmountImportedDistributed(
      amountImportedDistributed,
      i18n
    );
    const validatedBatchCodes = validateBatchCodes(batchCodes, i18n);
    const validatedBestBefore = validateDate(bestBefore, i18n);
    const validatedBrand = validateBrand(brand, i18n);
    const validatedCompanies = validateCompanies(companies, i18n, {
      required: !isCreate,
    });
    const validatedDisplayUntil = validateDate(displayUntil, i18n);
    const validatedOriginCountry = validateAddressCountry(originCountry, i18n);
    const validatedPackSize = validatePackSize(packSize, i18n);
    const validatedPackageDescription = validatePackageDescription(
      packageDescription,
      i18n
    );
    const validatedProductName = validateProductName(productName, i18n);
    const validatedProductType = validateProductType(productType, i18n);
    const validatedUnitType = validateUnitType(unitType, i18n);
    const validatedUseBy = validateDate(useBy, i18n);

    const isValid = allValid([
      validatedAdditionalInformation,
      validatedAmountImportedDistributed,
      validatedBatchCodes,
      validatedBestBefore,
      validatedBrand,
      validatedCompanies,
      validatedDisplayUntil,
      validatedOriginCountry,
      validatedPackSize,
      validatedPackageDescription,
      validatedProductName,
      validatedProductType,
      validatedUnitType,
      validatedUseBy,
    ]);

    const isEmpty =
      isEmptyFn([
        additionalInformation,
        amountImportedDistributed,
        batchCodes,
        (bestBefore && bestBefore.day) || undefined,
        (bestBefore && bestBefore.month) || undefined,
        (bestBefore && bestBefore.year) || undefined,
        brand,
        (displayUntil && displayUntil.day) || undefined,
        (displayUntil && displayUntil.month) || undefined,
        (displayUntil && displayUntil.year) || undefined,
        originCountry !== "0" ? originCountry : undefined,
        packSize,
        packageDescription,
        productName,
        productType !== "0" ? productType : undefined,
        unitType !== "0" ? unitType : undefined,
        (useBy && useBy.day) || undefined,
        (useBy && useBy.month) || undefined,
        (useBy && useBy.year) || undefined,
      ]) && validatedCompanies.companies.isEmpty;

    return {
      isValid,
      validatedFields: {
        ...validatedAdditionalInformation,
        ...validatedAmountImportedDistributed,
        ...validatedBatchCodes,
        bestBefore: validatedBestBefore.date,
        ...validatedBrand,
        ...validatedCompanies,
        displayUntil: validatedDisplayUntil.date,
        originCountry: validatedOriginCountry.country,
        ...validatedPackSize,
        ...validatedPackageDescription,
        ...validatedProductName,
        ...validatedProductType,
        ...validatedUnitType,
        useBy: validatedUseBy.date,
      },
      isEmpty,
    };
  },
};
