const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

const LOOKUP = `${process.env.LOOKUP_API_BASE_URL}${process.env.LOOKUP_API_PATH}`;

module.exports = {
  getCountries: async (languageCode, selectedValue = 0) => {
    try {
      const lookupResponse = await fetch(LOOKUP);
      const responseJson = await lookupResponse.json();
      const countries = responseJson.countries
        ? responseJson.countries.map((sims) => ({
            id: sims.id,
            country: sims.title,
          }))
        : [];

      let defaultCountry;
      if (!selectedValue || selectedValue === 0) {
        defaultCountry = countries.find(
          (c) => c.country.toLowerCase() === "united kingdom"
        );
      }

      const defaultSelectedValue = defaultCountry
        ? defaultCountry.id.toString()
        : selectedValue.toString();

      const sortedCountries = countries.sort((rca, rcb) =>
        rca.country.localeCompare(rcb.country)
      );

      return sortedCountries.map(({ id, country }) => ({
        value: id,
        text: country,
        selected: id === parseInt(defaultSelectedValue, 10),
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};
