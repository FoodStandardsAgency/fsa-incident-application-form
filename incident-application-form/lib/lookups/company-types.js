const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

const LOOKUP =`${process.env.LOOKUP_API_BASE_URL}${process.env.LOOKUP_API_PATH}`;

module.exports = {
  getCompanyTypes: async (languageCode, selectedValue = 0) => {
    try {
      const lookupResponse = await fetch(LOOKUP);
      const responseJson = await lookupResponse.json();
      const fboTypes = responseJson.fboTypes ? responseJson.fboTypes.map( sims => ({id: sims.id, companyType:sims.title}))
        : [];

      const rawCompanyTypes = [
        {
          id: 0,
          companyType:
            formFieldTranslations.companyType.values.defaultValue[languageCode],
        },
        ...fboTypes,
      ];

      return rawCompanyTypes.map(({ id, companyType }) => ({
        value: id,
        text: companyType,
        selected: id === parseInt(selectedValue.toString(), 10),
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};
