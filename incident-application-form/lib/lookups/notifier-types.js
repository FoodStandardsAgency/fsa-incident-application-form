const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

const LOOKUP =`${process.env.LOOKUP_API_BASE_URL}${process.env.LOOKUP_API_PATH}`;

module.exports = {
  getNotifierTypes: async (languageCode, selectedValue = 0) => {
    try {
      const lookupResponse = await fetch(LOOKUP);
      const responseJson = await lookupResponse.json();
      const notifierTypes = responseJson.notifierTypes ? responseJson.notifierTypes.map( sims => ({id: sims.id, notifierType:sims.title}))
        : [];

      const rawNotifierTypes = [
        {
          id: 0,
          notifierType:
            formFieldTranslations.notifierType.values.defaultValue[
              languageCode
            ],
        },
        ...notifierTypes,
      ];

      return rawNotifierTypes.map(({ id, notifierType }) => ({
        value: id,
        text: notifierType,
        selected: id === parseInt(selectedValue.toString(), 10),
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};
