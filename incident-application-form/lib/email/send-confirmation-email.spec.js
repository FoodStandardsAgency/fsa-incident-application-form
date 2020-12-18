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
      yourDetails: {},
    },
    {
      yourDetails: {
        email: false,
      },
    },
    {
      yourDetails: {
        email: {
          value: false,
        },
      },
    },
    {
      yourDetails: {
        email: {
          value: undefined,
        },
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
      yourDetails: {
        contactName: {
          value: fakeContactName,
        },
        email: {
          value: fakeEmail,
        },
      },
      referenceNumber: fakeRefNo,
    });
    expect(send).toHaveBeenCalledWith("en-confirmation-email", fakeEmail, {
      contactName: fakeContactName,
      referenceNumber: fakeRefNo,
    });
  });
});
