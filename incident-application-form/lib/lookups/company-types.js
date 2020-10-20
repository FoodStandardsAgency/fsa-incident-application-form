const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

module.exports = {
  getCompanyTypes: async (languageCode, selectedValue = 0) => {
    try {
      const companyTypesResponse = await fetch(
        `${process.env.LOOKUP_API_BASE_URL}/lookup/companyType`
      );
      const rawCompanyTypes = [
        {
          id: 0,
          companyType:
            formFieldTranslations.companyType.values.defaultValue[languageCode],
        },
        ...(await companyTypesResponse.json()),
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
