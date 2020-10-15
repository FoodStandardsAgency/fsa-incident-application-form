const express = require("express");

const router = express.Router();

const template = "details-of-product";

const languageCode = "en";
const pageTranslations = require(`${__dirname}/../translations/${template}.json`);
const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);

const i18n = {
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
};

router.get("/", async function (req, res, next) {
  const tabularDetailsOfProducts = [
    [
      { text: "product name 1" },
      {
        html: `
          <button
            class="govuk-button govuk-button--secondary"
            data-module="govuk-button"
          >
            Remove
          </button>
        `,
      },
    ],
    [
      { text: "product name 2" },
      {
        html: `
          <button
            class="govuk-button govuk-button--secondary"
            data-module="govuk-button"
          >
            Remove
          </button>
        `,
      },
    ],
  ];

  res.render(template, {
    i18n,
    tabularDetailsOfProducts: [],
  });
});

module.exports = router;
