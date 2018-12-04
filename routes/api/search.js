const express = require("express");
const router = express.Router();

var request = require("request");

var Company = require("../../models/LookUpSchema");

/* search functions */
router.get("/", (req, res) => {
  res.render("search", { title: "Search", query: {} });
  console.log("rendering search");
});

// @route   GET /api/search/stock
// @desc    Display search view
//@view     search-stock
// @access  Public
router.get("/stock", (req, res) => {
  res.render("search-stock", { title: "Search Stock", query: {} });
  console.log(req.body.id);
});

router.post("/stock", function(req, res) {
  var query = {
    input: req.body.id
  };

  var options = {
    url: "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json",
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
      console.log(jsonBody);
      var lookupInfo = new Company(jsonBody);

      lookupInfo.save(function(err) {
        if (err) {
          throw err;
        } else {
          console.log(jsonBody);
          res.render("lookup-detail", { query: jsonBody });
        }
      });
      //remove next line and uncomment above
      //res.render('lookup-detail',{query:jsonBody})
    }
  });
});

module.exports = router;
