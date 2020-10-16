const assembleAddress = ({ address }) => {
  return {
    AddressLine1: address.line1.value,
    AddressLine2: address.line2.value,
    TownCity: address.town.value,
    County: address.county.value,
    Postcode: address.postcode.value,
    CountryID: parseInt(address.country.value, 10),
  };
};

module.exports = {
  assemblePayload({ yourDetails }) {
    return {
      Incidents: {
        NotifierID: parseInt(yourDetails.notifierType.value, 10),
      },
      IncidentStakeholders: {
        Name: yourDetails.contactName.value,
        Role: yourDetails.position.value,
        GovDept: yourDetails.organisation.value,
        Email: yourDetails.email.value,
        Phone: yourDetails.telephone1.value,
      },
      Addresses: assembleAddress(yourDetails),
    };
  },
};
