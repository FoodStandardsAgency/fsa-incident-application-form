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
var yourDetailsRouter = require("./routes/your-details");
var detailsOfIncidentRouter = require("./routes/details-of-incident");
var detailsOfProductRouter = require("./routes/details-of-product");
var productRouter = require("./routes/product");
var companyRouter = require("./routes/company");
var previewRouter = require("./routes/preview");
var companyTypeRouter = require("./lookupMocks/company-type");
var countryRouter = require("./lookupMocks/country");
var notifierTypeRouter = require("./lookupMocks/notifier-type");
var productTypeRouter = require("./lookupMocks/product-type");
var unitsRouter = require("./lookupMocks/units");

var app = express();

var isProduction = app.get("env") === "production";

// view engine setup
nunjucks.configure(["node_modules/govuk-frontend/", "views"], {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
});
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

app.use("/", indexRouter);
app.use(routes.YOUR_DETAILS, yourDetailsRouter);
app.use(routes.DETAILS_OF_INCIDENT, detailsOfIncidentRouter);
app.use(routes.DETAILS_OF_PRODUCT, detailsOfProductRouter);
app.use(routes.PRODUCT, productRouter);
app.use(`${routes.PRODUCT}/:productId/company`, companyRouter);
app.use(routes.PREVIEW, previewRouter);

app.use("/lookup/companyType", companyTypeRouter);
app.use("/lookup/country", countryRouter);
app.use("/lookup/notifierType", notifierTypeRouter);
app.use("/lookup/productType", productTypeRouter);
app.use("/lookup/units", unitsRouter);

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
