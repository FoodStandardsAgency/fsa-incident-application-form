require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var nunjucks = require("nunjucks");
var session = require("express-session");

var routes = require(`${__dirname}/routes/routes.json`);

var indexRouter = require("./routes/index");
var cookiesRouter = require("./routes/cookies");
var accessibilityRouter = require("./routes/accessibility");
var yourDetailsRouter = require("./routes/your-details");
var detailsOfIncidentRouter = require("./routes/details-of-incident");
var detailsOfProductRouter = require("./routes/details-of-product");
var productRouter = require("./routes/product");
var companyRouter = require("./routes/company");
var previewRouter = require("./routes/preview");
var thankyouRouter = require("./routes/complete");

var { localisePath } = require("./lib/path-to-localised-path");
var formSubmitChoices = require("./lib/form-submit-choices");

var app = express();

var isProduction = app.get("env") === "production";

// view engine setup
var nunjucksEnv = nunjucks.configure(
  ["node_modules/govuk-frontend/", "views"],
  {
    autoescape: true,
    express: app,
    noCache: true,
    watch: true,
  }
);
nunjucksEnv.addGlobal("localisePath", localisePath);
nunjucksEnv.addGlobal("formSubmitChoices", formSubmitChoices);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "njk");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var sessionConfig = {
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {},
};

if (isProduction) {
  sessionConfig.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionConfig));

function getLanguageStrings(req, res, next) {
  req.locale = req.params.locale === "cy" ? "cy" : "en";
  next();
}

app.use("/:locale(cy)?", getLanguageStrings, indexRouter);
app.use(
  `/:locale(cy)?/${routes.YOUR_DETAILS}`,
  getLanguageStrings,
  yourDetailsRouter
);
app.use(
  `/:locale(cy)?/${routes.DETAILS_OF_INCIDENT}`,
  getLanguageStrings,
  detailsOfIncidentRouter
);
app.use(
  `/:locale(cy)?/${routes.DETAILS_OF_PRODUCT}`,
  getLanguageStrings,
  detailsOfProductRouter
);
app.use(`/:locale(cy)?/${routes.PRODUCT}`, getLanguageStrings, productRouter);
app.use(
  `/:locale(cy)?/${routes.PRODUCT}/:productId/company`,
  getLanguageStrings,
  companyRouter
);
app.use(`/:locale(cy)?/${routes.PREVIEW}`, getLanguageStrings, previewRouter);
app.use(`/:locale(cy)?/${routes.COMPLETE}`, getLanguageStrings, thankyouRouter);

app.use("/cookies", cookiesRouter);
app.use("/accessibility", accessibilityRouter);

app.use(
  "/assets",
  express.static(
    path.join(__dirname, "/node_modules/govuk-frontend/govuk/assets")
  )
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
