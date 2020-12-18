const send = require("./send");

module.exports = async (data) => {
  if (!process.env.NOTIFICATION_EMAIL) {
    return true;
  }

  const email = process.env.NOTIFICATION_EMAIL;
  const personalisation = {
    contactName: data.yourDetails.contactName.value,
    referenceNumber: data.referenceNumber,
  };
  await send("en-notification-of-incident-email", email, personalisation);
};
