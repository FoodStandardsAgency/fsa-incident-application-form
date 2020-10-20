const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

module.exports = {
  getProductTypes: async (languageCode, selectedValue = 0) => {
    try {
      const productTypesResponse = await fetch(
        `${process.env.LOOKUP_API_BASE_URL}/lookup/productType`
      );
      const rawProductTypes = [
        {
          id: 0,
          productType:
            formFieldTranslations.productType.values.defaultValue[languageCode],
        },
        ...(await productTypesResponse.json()),
      ];

      return rawProductTypes.map(({ id, productType }) => ({
        value: id,
        text: productType,
        selected: id === parseInt(selectedValue.toString(), 10),
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};
