var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.json([
    { id: 4, notifierType: "Industry" },
    { id: 18, notifierType: "Local Authority" },
  ]);
});

module.exports = router;
