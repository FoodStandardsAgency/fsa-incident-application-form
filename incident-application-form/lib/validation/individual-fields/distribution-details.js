const validator = require("validator");

module.exports = {
  validateDistributionDetails: (distributionDetails, i18n) => {
    return {
      distributionDetails: {
        isValid: true,
        messages: [],
        value: (distributionDetails && distributionDetails.toString()) || "",
      },
    };
  },
};
