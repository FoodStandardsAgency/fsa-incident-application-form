const sendNotificationEmail = require("./send-notification-email");
const send = require("./send");

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
    const fakeContactName = "timmy tester";
    const fakeRefNo = "abc-123";

    process.env.NOTIFICATION_EMAIL = fakeEmail;

    await sendNotificationEmail({
      yourDetails: {
        contactName: {
          value: fakeContactName,
        },
      },
      referenceNumber: fakeRefNo,
    });
    expect(send).toHaveBeenCalledWith(
      "en-notification-of-incident-email",
      fakeEmail,
      {
        contactName: fakeContactName,
        referenceNumber: fakeRefNo,
      }
    );
  });
});
