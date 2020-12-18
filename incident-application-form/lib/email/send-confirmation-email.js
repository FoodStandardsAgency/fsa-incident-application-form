const send = require("./send");

module.exports = async (data) => {
  if (
    !data ||
    Object.keys(data).length === 0 ||
    !data.yourDetails ||
    Object.keys(data.yourDetails).length === 0 ||
    !data.yourDetails.email ||
    Object.keys(data.yourDetails.email).length === 0 ||
    !data.yourDetails.email.value
  ) {
    return true;
  }

  const email = data.yourDetails.email.value;

  if (
    !data ||
    Object.keys(data).length === 0 ||
    !data.referenceNumber ||
    !data.yourDetails ||
    Object.keys(data.yourDetails).length === 0 ||
    !data.yourDetails.contactName ||
    Object.keys(data.yourDetails.contactName).length === 0 ||
    !data.yourDetails.contactName.value
  ) {
    return true;
  }

  const personalisation = {
    contactName: data.yourDetails.contactName.value,
    referenceNumber: data.referenceNumber,
  };

  await send("en-confirmation-email", email, personalisation);
};
