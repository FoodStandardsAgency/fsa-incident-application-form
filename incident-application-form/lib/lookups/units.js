const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

module.exports = {
  getUnits: async (languageCode, selectedValue = 0) => {
    try {
      const unitsResponse = await fetch(
        `${process.env.LOOKUP_API_BASE_URL}/lookup/units`
      );
      const rawUnits = [
        {
          id: 0,
          unit:
            formFieldTranslations.unitType.values.defaultValue[languageCode],
        },
        ...(await unitsResponse.json()),
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
