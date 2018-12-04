const express = require("express");
const router = express.Router();
var request = require("request");

var marketCompany = require("../../models/MarketCompany");

const { ensureAuthenticated } = require("../../helpers/auth");

// Route: api/markets

router.get("/gainers", ensureAuthenticated, function(req, res) {
  /* top gaining */
  var options = {
    url: "https://api.iextrading.com/1.0/stock/market/list/gainers",
    method: "GET"
  };

  request(options, function(err, request, body) {
    var jsonBody = JSON.parse(body);
    var company = jsonBody.map(function(data) {
      return new marketCompany(data);
    });
    console.log(company.length);

    res.render("markets", {
      marketCompany: company,
      title: "Top Market Gainers"
    });
  });
});

router.get("/losers", ensureAuthenticated, function(req, res) {
  /* loseing */
  var options = {
    url: "https://api.iextrading.com/1.0/stock/market/list/losers",
    method: "GET"
  };

  request(options, function(err, request, body) {
    var jsonBody = JSON.parse(body);
    var company = jsonBody.map(function(data) {
      return new marketCompany(data);
    });
    console.log(company.length);

    res.render("markets", { marketCompany: company, title: "Losers" });
  });
});

router.get("/inFocus", ensureAuthenticated, function(req, res) {
  /* in focus */
  var options = {
    url: "https://api.iextrading.com/1.0/stock/market/list/infocus",
    method: "GET"
  };

  request(options, function(err, request, body) {
    var jsonBody = JSON.parse(body);
    var company = jsonBody.map(function(data) {
      return new marketCompany(data);
    });
    console.log(company.length);

    res.render("markets", { marketCompany: company, title: "Focus" });
  });
});

module.exports = router;
