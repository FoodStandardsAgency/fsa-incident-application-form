const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

const LOOKUP =`${process.env.LOOKUP_API_BASE_URL}${process.env.LOOKUP_API_PATH}`;

module.exports = {
  getUnits: async (languageCode, selectedValue = 0) => {
    try {
      const lookupResponse = await fetch(LOOKUP);
      const responseJson = await lookupResponse.json();
      const units = responseJson.units ? responseJson.units.map( sims => ({id: sims.id, unit:sims.title}))
        : [];

      const rawUnits = [
        {
          id: 0,
          unit:
            formFieldTranslations.unitType.values.defaultValue[languageCode],
        },
        ...units,
      ];

      return rawUnits.map(({ id, unit }) => ({
        value: id,
        text: unit,
        selected: id === parseInt(selectedValue.toString(), 10),
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};
