const express = require("express");

const indexRouter = require("./routes/index");
const incidentPayloadRouter = require("./routes/incident-payload");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/incident-payload", incidentPayloadRouter);

module.exports = app;
