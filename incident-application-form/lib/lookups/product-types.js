const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

const LOOKUP =`${process.env.LOOKUP_API_BASE_URL}${process.env.LOOKUP_API_PATH}`;

module.exports = {
  getProductTypes: async (languageCode, selectedValue = 0) => {
    try {
      const lookupResponse = await fetch(LOOKUP);
      const responseJson = await lookupResponse.json();
      const productTypes = responseJson.productTypes ? responseJson.productTypes.map( sims => ({id: sims.id, productType:sims.title}))
        : [];

      const rawProductTypes = [
        {
          id: 0,
          productType:
            formFieldTranslations.productType.values.defaultValue[languageCode],
        },
        ...productTypes,
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
