const fetch = require("node-fetch");
const formFieldTranslations = require(`${__dirname}/../../translations/form-fields.json`);

module.exports = {
  getSelectedNotifierTypeFromSession: (session) => {
    return (
      (session &&
        session.yourDetails &&
        session.yourDetails.notifierType &&
        session.yourDetails.notifierType.value) ||
      0
    );
  },
  getNotifierTypes: async (languageCode, selectedValue = 0) => {
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
        selected: id === parseInt(selectedValue.toString(), 10),
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};
