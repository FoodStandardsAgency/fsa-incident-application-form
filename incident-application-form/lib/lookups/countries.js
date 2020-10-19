const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

module.exports = {
  getSelectedCountryFromSession: (session) => {
    return (
      (session &&
        session.yourDetails &&
        session.yourDetails.address &&
        session.yourDetails.address.country &&
        session.yourDetails.address.country.value) ||
      0
    );
  },
  getCountries: async (languageCode, selectedValue = 0) => {
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
        selected: id === parseInt(selectedValue.toString(), 10),
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};
