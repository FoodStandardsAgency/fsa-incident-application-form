const express = require("express");

const indexRouter = require("./routes/index");
const incidentPayloadRouter = require("./routes/incident-payload");
const simsLookupsRouter = require("./routes/sims-lookups");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/incident-payload", incidentPayloadRouter);
app.use("/sims-lookups", simsLookupsRouter);

module.exports = app;
