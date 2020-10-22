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

    return {
      isValid,
      validatedFields: {
        ...validatedAdditionalInformation,
        ...validatedAmountImportedDistributed,
        ...validatedBatchCodes,
        bestBefore: validatedBestBefore.date,
        ...validatedBrand,
        // companies,
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
    };
  },
};
