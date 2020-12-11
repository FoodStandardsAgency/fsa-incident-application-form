const fetch = require("node-fetch");

module.exports = async (assembledPayload) => {
  const url = `${process.env.PAYLOAD_SUBMISSION_API_BASE_URL}${process.env.PAYLOAD_SUBMISSION_API_PATH}`;

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assembledPayload),
  });
};
