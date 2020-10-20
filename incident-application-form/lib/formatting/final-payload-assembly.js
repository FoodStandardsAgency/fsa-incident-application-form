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

const assembleCompany = (company) => {
  return {
    Name: company.companyName.value,
  };
};

const assembleProduct = (product) => {
  const Companies = [];

  for (const companyId of Object.keys(product.companies)) {
    Companies.push(assembleCompany(product.companies[companyId]));
  }

  return {
    Brand: product.brand.value,
    Companies,
    Name: product.productName.value,
  };
};

module.exports = {
  assemblePayload({ yourDetails, detailsOfIncident, products }) {
    const formattedProducts = [];

    for (const productId of Object.keys(products)) {
      formattedProducts.push(assembleProduct(products[productId]));
    }

    return {
      Addresses: assembleAddress(yourDetails),
      Incidents: {
        NotifierID: parseInt(yourDetails.notifierType.value, 10),
        NatureOfProblem: detailsOfIncident.natureOfProblem.value,
        ActionTaken: detailsOfIncident.actionTaken.value,
        DistributionDetails: detailsOfIncident.distributionDetails.value,
        IllnessDetails: detailsOfIncident.illnessDetails.value,
        LocalAuthorityNotified: detailsOfIncident.localAuthorityNotified.value,
        AdditionalInformation: detailsOfIncident.additionalInformation.value,
      },
      IncidentProducts: [...formattedProducts],
      IncidentStakeholders: {
        Name: yourDetails.contactName.value,
        Role: yourDetails.position.value,
        GovDept: yourDetails.organisation.value,
        Email: yourDetails.email.value,
        Phone: yourDetails.telephone1.value,
      },
    };
  },
};
