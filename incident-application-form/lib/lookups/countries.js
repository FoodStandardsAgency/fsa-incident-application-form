const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

module.exports = {
  getCountries: async (languageCode) => {
    try {
      const countriesResponse = await fetch(
        `${process.env.LOOKUP_API_BASE_URL}/lookup/country`
      );
      const rawCountries = [
        {
          id: 0,
          country:
            formFieldTranslations.address.country.values.defaultValue[
              languageCode
            ],
        },
        ...(await countriesResponse.json()),
      ];

      return rawCountries.map(({ id, country }) => ({
        value: id,
        text: country,
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};
