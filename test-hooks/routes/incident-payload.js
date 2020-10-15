var express = require('express');
var router = express.Router();

// ----
// endpoints for receiving test payload objects and providing a way for
//  cypress to subsequently come and query against the received payloads
// ----

const payloadsReceived = [];

router.get('/flush', (req, res, next) => {
  payloadsReceived.splice(0,payloadsReceived.length);
  res.status(200).send();
})
router.post('/', (req, res, next) => {
  payloadsReceived.push(req.body);
  res.status(200).send();
});

router.get('/', (req, res, next) => {
  res.status(200).send(payloadsReceived);
});

router.get('/:id', (req, res, next) => {
  const payloadById = payloadsReceived.find( candidatePayload => candidatePayload.id === req.params.id);
  if (payloadById) {
    res.status(200).send(payloadById);
  } else {
    res.status(404).send();
  }

});

module.exports = router;
