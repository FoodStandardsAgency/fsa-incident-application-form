const sendConfirmationEmail = require("./send-confirmation-email");
const send = require("./send");

jest.mock("./send");

describe(`lib/email/send-confirmation-email`, () => {
  [
    undefined,
    null,
    false,
    {},
    {
      IncidentStakeholders: {},
    },
    {
      IncidentStakeholders: {
        email: false,
      },
    },
    {
      IncidentStakeholders: {
        email: undefined,
      },
    },
  ].forEach((given) => {
    it("should not call `send` if the given email value is invalid", async () => {
      await sendConfirmationEmail(given);
      expect(send).not.toHaveBeenCalled();
    });
  });

  it("should send when given valid data", async () => {
    const fakeEmail = "a@b.com";
    const fakeContactName = "timmy tester";
    const fakeRefNo = "abc-123";

    await sendConfirmationEmail({
      IncidentStakeholders: {
        Name: fakeContactName,
        Email: fakeEmail,
      },
      Incidents: {
        IncidentTitle: fakeRefNo,
      }
    });
    expect(send).toHaveBeenCalledWith("en-confirmation-email", fakeEmail, {
      contactName: fakeContactName,
      referenceNumber: fakeRefNo,
    });
  });
});
