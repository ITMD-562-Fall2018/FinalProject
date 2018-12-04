"use strict";

var request = require("request");
var stockModel = require("/stock");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/history", function(req, res) {
    stockModel.find(function(err, result) {
      if (err) {
        throw err;
      }

      res.render("history", { stocks: result });
    });
  });

  app.post("/api/stock", function(req, res) {
    console.log(req.body);
    var query = {
      symbol: req.body.stockSymbol
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
      var jsonBody = JSON.parse(body);
      if (!jsonBody.Message) {
        var newStock = new stockModel(jsonBody);
        newStock.user = req.user;
        newStock.save(function(err) {
          if (err) {
            throw err;
          }
        });
      }

      res.json(body);
    });
  });
};
