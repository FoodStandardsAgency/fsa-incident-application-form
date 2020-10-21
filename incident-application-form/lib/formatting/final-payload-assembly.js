const assembleAddress = (address) => {
  return {
    AddressLine1: address.line1.value,
    AddressLine2: address.line2.value,
    TownCity: address.town.value,
    County: address.county.value,
    Postcode: address.postcode.value,
    CountryID: parseInt(address.country.value, 10) || 0,
  };
};

const assembleCompany = (company) => {
  return {
    Addresses: assembleAddress(company.address),
    Contact: {
      Name: company.contactName.value,
      EmailAddress: company.email.value,
      TelephoneNumber: company.telephone1.value,
    },
    FBOSTypes: parseInt(company.companyType.value, 10) || 0,
    Name: company.companyName.value,
  };
};

const assembleProduct = (product) => {
  const Companies = [];

  for (const companyId of Object.keys(product.companies)) {
    Companies.push(assembleCompany(product.companies[companyId]));
  }

  const formatBatchCodes = (batchCodes) =>
    batchCodes
      .replace(/\r?\n|\r/, "\n")
      .split("\n")
      .map((s) => s.trim())
      .join(",");

  return {
    AdditionalInfo: product.additionalInformation.value,
    Amount: parseInt(product.amountImportedDistributed.value, 10) || 0,
    AmountUnitTypeId: parseInt(product.unitType.value, 10) || 0,
    BatchCodes: formatBatchCodes(product.batchCodes.value),
    Brand: product.brand.value,
    Companies,
    CountryOfOriginId: parseInt(product.originCountry.value, 10) || 0,
    IncidentProductDates: {
      BestBeforeDate: product.bestBefore.iso,
      UseByDate: product.useBy.iso,
      DisplayUntil: product.displayUntil.iso,
    },
    IncidentProductPackSizes: {
      Size: product.packSize.value,
    },
    Name: product.productName.value,
    PackDescription: product.packageDescription.value,
    ProductTypeId: parseInt(product.productType.value, 10) || 0,
  };
};

module.exports = {
  assemblePayload({
    yourDetails,
    detailsOfIncident,
    products,
    referenceNumber,
  }) {
    const formattedProducts = [];

    for (const productId of Object.keys(products)) {
      formattedProducts.push(assembleProduct(products[productId]));
    }

    return {
      Addresses: assembleAddress(yourDetails.address),
      Incidents: {
        IncidentTitle: referenceNumber,
        NotifierID: parseInt(yourDetails.notifierType.value, 10) || 0,
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
