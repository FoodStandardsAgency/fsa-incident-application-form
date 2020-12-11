var express = require('express');
var router = express.Router();

// ----
// endpoints for receiving mock lookup objects from a cypress test
//  that the application can subsequently pick up and use to render dropdowns..
// ----

let lookupsReceived = {};

router.get('/flush', (req, res, next) => {
  lookupsReceived = {};
  res.status(200).send();
});

router.post('/', (req, res, next) => {
  lookupsReceived = req.body;
  res.status(200).send();
});

router.get('/', (req, res, next) => {
  res.status(200).send(lookupsReceived);
});

module.exports = router;
