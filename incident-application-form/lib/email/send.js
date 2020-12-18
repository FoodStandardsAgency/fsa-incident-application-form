require("dotenv").config();

const { NotifyClient } = require("notifications-node-client");
const notifyClient = new NotifyClient(process.env.GOV_NOTIFY_API_KEY);

const templates = require("./templates");

module.exports = async (templateName, sendTo, personalisation) => {
  if (!sendTo) {
    return true;
  }

  const templateId = templates[templateName];
  if (!templateId) {
    throw `Couldn't find a template for ${templateName}; unable to send an email.. good options are: ${JSON.stringify(
      templates
    )}`;
  }

  await notifyClient
    .sendEmail(templateId, sendTo, { personalisation, reference: null })
    .catch((err) => {
      console.log(`Failed to send email to address: ${sendTo}`);
      console.log(err.response.data);
      return false;
    });
};
