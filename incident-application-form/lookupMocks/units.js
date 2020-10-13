var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.json([
    { id: 5, unit: "Grams" },
    { id: 3, unit: "Kg" },
    { id: 2, unit: "Litres" },
    { id: 1, unit: "Tonnes" },
    { id: 4, unit: "Units" },
  ]);
});

module.exports = router;
