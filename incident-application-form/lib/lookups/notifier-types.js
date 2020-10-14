const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

module.exports = {
  getNotifierTypes: async (languageCode) => {
    try {
      const notifierTypesResponse = await fetch(
        `${process.env.LOOKUP_API_BASE_URL}/lookup/notifierType`
      );
      const rawNotifierTypes = [
        {
          id: 0,
          notifierType:
            formFieldTranslations.notifierType.values.defaultValue[
              languageCode
            ],
        },
        ...(await notifierTypesResponse.json()),
      ];

      return rawNotifierTypes.map(({ id, notifierType }) => ({
        value: id,
        text: notifierType,
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};
