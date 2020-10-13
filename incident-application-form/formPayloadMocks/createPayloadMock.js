const { yourDetailsPayload } = require("./01-your-details");
const { detailsOfIncidentPayload } = require("./02-details-of-incident");
const { detailsOfProductsPayload } = require("./03-details-of-products");

const payload = {
  ...yourDetailsPayload(),
  ...detailsOfIncidentPayload(),
  ...detailsOfProductsPayload(),
};

console.log(JSON.stringify(payload, null, 2));
