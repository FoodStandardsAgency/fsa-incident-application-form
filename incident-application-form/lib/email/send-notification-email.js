const dot = require("dot-object");

const send = require("./send");

module.exports = async (data) => {
  if (!process.env.NOTIFICATION_EMAIL) {
    return true;
  }

  const email = process.env.NOTIFICATION_EMAIL;

  // note - i'm relying on the fact that the payload has been normalised
  // so fields that were ignored in the form should have been pre-populated
  //   with ""s
  // then i'm using 'dot-object' to flatten the non-list bits of data
  // + passing them straight in as the 'personalisation' for govnotify

  // there is an argument to be made for assembling this manually as
  // changes to the payload structure -could- have effects on whether
  // or not we're sending all the required fields to govnotify..
  const easyFields = {
    Addresses: {...data.Addresses},
    Incidents: {...data.Incidents},
    IncidentStakeholders: {...data.IncidentStakeholders},
  }

  const easyFieldsInDotNotation = dot.dot(easyFields);

  const personalisation = {
    contactName: data.IncidentStakeholders.Name,
    referenceNumber: data.Incidents.IncidentTitle,
    ...easyFieldsInDotNotation,
  };
  await send("en-notification-of-incident-email", email, personalisation);
};
