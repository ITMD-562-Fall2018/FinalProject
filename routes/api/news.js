const express = require("express");
const router = express.Router();
const request = require("request");

var Article = require("../../models/MarketNews");

// Route: api/news

const { ensureAuthenticated } = require("../../helpers/auth");

/* show news on market */
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("news", { title: "news", query: {} });
});

// @route   GET api/posts
// @desc    Get news articles for entire market
// @access  Public
router.get("/market", ensureAuthenticated, function(req, res) {
  var query = {
    symbol: req.body.id
  };

  var options = {
    url: "https://api.iextrading.com/1.0/stock/market/news/last/10",
    method: "GET",
    qs: query
  };

  request(options, function(err, request, body) {
    var jsonBody = JSON.parse(body);
    var articles = jsonBody.map(function(data) {
      return new Article(data);
    });

    res.render("news", { Article: articles });
  });
});

/* show news for a single market */
router.post("/api/news/company", function(req, res) {
  var query = {
    input: req.body.id
  };

  var thisCompany = req.body.id;

  var options = {
    url:
      "https://api.iextrading.com/1.0/stock/" + thisCompany + "/news/last/20",
    method: "GET"
  };

  request(options, function(err, request, body) {
    let error = false;
    try {
      var jsonBody = JSON.parse(body);
    } catch (err) {
      error = true;
      req.flash("error", "Symbol not found!");
      res.redirect("./market");
    }

    if (error === false) {
      var articles = jsonBody.map(function(data) {
        return new Article(data);
      });

      res.render("news", { Article: articles });
    }

  });
});

console.log("test1");

module.exports = router;
