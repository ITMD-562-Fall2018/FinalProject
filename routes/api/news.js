const express = require("express");
const router = express.Router();
const request = require("request");

var Article = require("../../models/MarketNews");

/* show news on market */
router.get("/", (req, res) => {
  res.render("news", { title: "news", query: {} });
  console.log("loading news");
});

// @route   GET api/posts
// @desc    Get news articles for entire market
// @access  Public
router.get("/market", function(req, res) {
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
    console.log(jsonBody.length);
    console.log(articles.length);

    res.render("news", { Article: articles });
  });
});

/* show news for a single market */
router.post("/company/news", function(req, res) {
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

    var jsonBody = JSON.parse(body);

    var articles = jsonBody.map(function(data) {
      return new Article(data);
    });

    console.log("ARTICLES: " + { Article: articles });
    res.render("news", { Article: articles });
  });
});


module.exports = router;
