const send = require("./send");

module.exports = async (data) => {
  if (
    !data ||
    !data.IncidentStakeholders ||
    !data.IncidentStakeholders.Email ||
    !data.IncidentStakeholders.Name ||
    !data.Incidents ||
    !data.Incidents.IncidentTitle
  ) {
    return true;
  }

  const email = data.IncidentStakeholders.Email;

  const personalisation = {
    contactName: data.IncidentStakeholders.Name,
    referenceNumber: data.Incidents.IncidentTitle,
  };

  await send("en-confirmation-email", email, personalisation);
};
