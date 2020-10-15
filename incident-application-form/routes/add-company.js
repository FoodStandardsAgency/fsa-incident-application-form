const express = require("express");
// const { validate } = require("../lib/validation/add-product");

const router = express.Router();

const template = "add-company";

const languageCode = "en";
const pageTranslations = require(`${__dirname}/../translations/${template}.json`);
const formFieldTranslations = require(`${__dirname}/../translations/form-fields.json`);

const i18n = {
  languageCode,
  ...pageTranslations,
  ...formFieldTranslations,
};

router.get("/", async function (req, res, next) {
  // console.log(`i18n`, i18n);
  res.render(template, {
    i18n,
  });
});

router.post("/", async function (req, res, next) {
  console.log(`req.body`, req.body);
  const {} = req.body;

  // const validation = validate(
  //     {
  //
  //     },
  //     i18n
  // );
  //
  // if (!validation.isValid) {
  //   console.log(`not validation`, validation);
  //
  //   res.render(template, {
  //     i18n,
  //     validation,
  //   });
  //   return;
  // }

  // the valid form submission data
  // console.log(`validation`, validation.validatedFields);

  res.render(template, {
    i18n,
  });
});

module.exports = router;
