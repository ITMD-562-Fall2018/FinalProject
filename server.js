"use strict";
const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const app = express();
const session = require("express-session");
const methodOverride = require("method-override");
const port = process.env.PORT || 3001;

var mongoose = require("mongoose");

const { ensureAuthenticated } = require("./helpers/auth");

//PASSPORT CONFIG
require("./config/passport")(passport);

// DB CONFIG
const dbase = require("./config/keys").mongoUri;

//CONNECT TO MOGODB
mongoose
  .connect(
    dbase,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MONGODB Connected");
  })
  .catch(error => {
    console.log(error);
  });

//EXPRESS SESSION MIDDLEWARE
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// CONNECT FLASH MIDDLEWARE
app.use(flash());

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//GLOBAL VARIBLES
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.user = req.user || null;

  next();
});

var request = require("request");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
module.exports = app;
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

var Stock = require("./models/Stock");
var Favourites = require("./models/FavStock");

//LOAD ROUTES
const index = require("./routes/index");
const apiCharts = require("./routes/api/charts");
const apiSearch = require("./routes/api/search");
const apiStock = require("./routes/api/stock");
const apiNews = require("./routes/api/news");
const apiMarkets = require("./routes/api/markets");

// USE ROUTES
app.use("/", index);
app.use("/api/charts", apiCharts);
app.use("/api/search", apiSearch);
app.use("/api/stock", apiStock);
app.use("/api/news", apiNews);
app.use("/api/markets", apiMarkets);

// var session = "";

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// @route   GET api/posts
// @desc    Get news articles for entire market
// @access  Public

/* show news on market */
app.get("/news", (req, res) => {
  res.render("news", { title: "news", query: {} });
  console.log("loading news");
});

app.get("/api/markets", function(req, res) {
  res.render("markets");
});

let server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

const stop = () => {
  server.close();
};

module.exports.stop = stop;
