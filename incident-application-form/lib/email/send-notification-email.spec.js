const sendNotificationEmail = require("./send-notification-email");
const send = require("./send");

const aPayload = require("./aPayload.json");

jest.mock("./send");

describe(`lib/email/send-notification-email`, () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // most important - it clears the cache
    process.env = { ...OLD_ENV }; // make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });

  it("should not call `send` if the given process.env.NOTIFICATION_EMAIL value is invalid", async () => {
    process.env.NOTIFICATION_EMAIL = undefined;

    await sendNotificationEmail({});
    expect(send).not.toHaveBeenCalled();
  });

  it("should send when given valid data", async () => {
    const fakeEmail = "a@b.com";

    process.env.NOTIFICATION_EMAIL = fakeEmail;

    await sendNotificationEmail(aPayload);

    expect(send).toHaveBeenCalledWith(
      "en-notification-of-incident-email",
      fakeEmail,
      {
        'Addresses.AddressLine1': aPayload.Addresses.AddressLine1,
        'Addresses.AddressLine2': aPayload.Addresses.AddressLine2,
        'Addresses.TownCity': aPayload.Addresses.TownCity,
        'Addresses.County': aPayload.Addresses.County,
        'Addresses.Postcode': aPayload.Addresses.Postcode,
        'Incidents.IncidentTitle': aPayload.Incidents.IncidentTitle,
        'Incidents.NatureOfProblem': aPayload.Incidents.NatureOfProblem,
        'Incidents.ActionTaken': aPayload.Incidents.ActionTaken,
        'Incidents.DistributionDetails': aPayload.Incidents.DistributionDetails,
        'Incidents.IllnessDetails': aPayload.Incidents.IllnessDetails,
        'Incidents.LocalAuthorityNotified': aPayload.Incidents.LocalAuthorityNotified,
        'Incidents.AdditionalInformation': aPayload.Incidents.AdditionalInformation,
        'IncidentStakeholders.Name': aPayload.IncidentStakeholders.Name,
        'IncidentStakeholders.Role': aPayload.IncidentStakeholders.Role,
        'IncidentStakeholders.GovDept': aPayload.IncidentStakeholders.GovDept,
        'IncidentStakeholders.Email': aPayload.IncidentStakeholders.Email,
        'IncidentStakeholders.Phone': aPayload.IncidentStakeholders.Phone,
      }
    );
  });
});
