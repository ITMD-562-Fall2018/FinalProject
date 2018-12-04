const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const request = require("request");

var session = "";
var company = {};
var User = require("../models/User");
var Stock = require("../models/Stock");
var Favourites = require("../models/FavStock");

const { ensureAuthenticated } = require("../helpers/auth");

router.get("/", (req, res) => {
  console.log(typeof req.user);

  if (req.user) {
    res.redirect("./home");
  } else {
    req.flash("error", "Please login");
    res.redirect("./login");
  }
});

// Sign up route
router.get("/signup", (req, res) => {
  res.render("register", {
    user: {
      Name: false
    }
  });
});

// Register route
router.post("/register", (req, res) => {
  //res.render('index', {})
  console.log(req.body);

  var newUser = new User(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.Password, salt, (err, hash) => {
      if (err) throw err;
      newUser.Password = hash;

      newUser.save(function(err) {
        if (err) {
          throw err;
        } else {
          res.render("login", { user: req.body });
        }
      });
    });
  });
});

// Login route
router.post("/login", (req, res, next) => {
  console.log(req.body);

  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true
  })(req, res, next);
});

// Log out route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You are logged out");
  res.redirect("./login");
});

// Log in route
router.get("/login", (req, res) => {
  res.render("login", { user: {} });
});

router.get("/home", ensureAuthenticated, (req, res) => {
  Favourites.find({}, function(err, stocks) {
    if (err) {
      console.log(err);
      res.render("error", {});
    } else {
      res.render("index", { stocks: stocks });
    }
  });
});

router.get("/history", ensureAuthenticated, (req, res) => {
  Stock.find({ user: req.user }, function(err, stocks) {
    console.log(stocks);

    if (err) {
      console.log("error");
      // res.render("error", {});
    } else {
      res.render("history", { stocks: stocks });
    }
  });
});

router.delete(
  "/history/:symbol/:lastPrice",
  ensureAuthenticated,
  (req, res) => {
    Stock.remove({
      Symbol: req.params.symbol,
      LastPrice: req.params.lastPrice
    }).then(() => {
      req.flash("success", "Stock has been deleted!");
      res.redirect("/history");
    });
  }
);

router.get("/favorites/:symbol", ensureAuthenticated, (req, res) => {
  var query = {
    symbol: req.params.symbol
  };

  var options = {
    url: "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    qs: query
  };

  request(options, function(err, request, body) {
    // markitondemand return status 200 whether if found stock or not
    // if it found stock there will not be a message field
    // if found stock then and only then save data to MongoDB
    console.log("inside");
    var jsonBody = JSON.parse(body);
    if (!jsonBody.Message) {
      console.log("[JSON BODY]", jsonBody);
      var fav = new Favourites(jsonBody);
      fav.user = req.user;
      fav.save(function(err) {
        if (err) {
          throw err;
        } else {
          console.log(jsonBody);
          Favourites.find({ user: req.user }).then(stocks => {
            req.flash("success", "Favorite has been added!");
            res.redirect("/home");
          });
        }
      });
    }
  });
});

router.delete("/favorites/:symbol", (req, res) => {
  Favourites.remove({ Symbol: req.params.symbol }).then(() => {
    req.flash("success", "Favorite has been deleted!");
    res.redirect("/home");
  });
});

router.delete("/delete/:id", (req, res) => {
  User.remove({ _id: req.params.id }).then(() => {
    req.flash("success", "Account has been deleted!");
    res.redirect("/login");
  });
});

module.exports = router;
