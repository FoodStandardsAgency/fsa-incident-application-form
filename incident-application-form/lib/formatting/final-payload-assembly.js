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
  assemblePayload({ yourDetails, detailsOfIncident }) {
    return {
      Incidents: {
        NotifierID: parseInt(yourDetails.notifierType.value, 10),
        IncidentTitle: detailsOfIncident.incidentTitle.value,
        NatureOfProblem: detailsOfIncident.natureOfProblem.value,
        ActionTaken: detailsOfIncident.actionTaken.value,
        DistributionDetails: detailsOfIncident.distributionDetails.value,
        IllnessDetails: detailsOfIncident.illnessDetails.value,
        LocalAuthorityNotified: detailsOfIncident.localAuthorityNotified.value,
        AdditionalInformation: detailsOfIncident.additionalInformation.value,
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
