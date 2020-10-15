const { allValid } = require("./all-valid");
const { validateProductName } = require("./individual-fields/product-name");
const { validateBrand } = require("./individual-fields/brand");

module.exports = {
  validate: ({ productName, brand }, i18n) => {
    const validatedProductName = validateProductName(productName, i18n);
    const validatedBrand = validateBrand(brand, i18n);

    const isValid = allValid([validatedProductName, validatedBrand]);

    return {
      isValid,
      validatedFields: {
        ...validatedProductName,
        ...validatedBrand,
      },
    };
  },
};
