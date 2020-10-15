var express = require("express");
var router = express.Router();

const routes = require(`${__dirname}/../routes/routes.json`);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    links: [
      {
        url: routes.YOUR_DETAILS,
        text: "Your Details",
      },
      {
        url: routes.DETAILS_OF_INCIDENT,
        text: "Details of Incident",
      },
      {
        url: routes.DETAILS_OF_PRODUCT,
        text: "Details of Product",
      },
    ],
    routes,
  });
});

module.exports = router;
