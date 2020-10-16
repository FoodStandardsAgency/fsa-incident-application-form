const { allValid } = require("./all-valid");
const { validateProductName } = require("./individual-fields/product-name");
const { validateBrand } = require("./individual-fields/brand");

module.exports = {
  validate: ({ productName, brand, companies }, i18n) => {
    const validatedProductName = validateProductName(productName, i18n);
    const validatedBrand = validateBrand(brand, i18n);

    const isValid = allValid([validatedProductName, validatedBrand]);

    return {
      isValid,
      validatedFields: {
        ...validatedProductName,
        ...validatedBrand,
        // TODO - it would be extremely nice to validate companies here, rather than blindly assuming
        // that the companies argument contains validated companies.
        companies,
      },
    };
  },
};
