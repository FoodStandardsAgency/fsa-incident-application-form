const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

const LOOKUP =`${process.env.LOOKUP_API_BASE_URL}${process.env.LOOKUP_API_PATH}`;

module.exports = {
  getCountries: async (languageCode, selectedValue = 0) => {
    try {
      const lookupResponse = await fetch(LOOKUP);
      const responseJson = await lookupResponse.json();
      const countries = responseJson.countries ? responseJson.countries.map( sims => ({id: sims.id, country:sims.title}))
        : [];

      const rawCountries = [
        {
          id: 0,
          country:
            formFieldTranslations.address.country.values.defaultValue[
              languageCode
            ],
        },
        ...countries,
      ];
      return rawCountries.map(({ id, country }) => ({
        value: id,
        text: country,
        selected: id === parseInt(selectedValue.toString(), 10),
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};
