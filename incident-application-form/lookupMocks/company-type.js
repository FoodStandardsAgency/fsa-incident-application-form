var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.json([
    { id: 1, companyType: "Distributor" },
    { id: 2, companyType: "Importer" },
    { id: 3, companyType: "Retailer" },
    { id: 4, companyType: "Manufacturer" },
  ]);
});

module.exports = router;
