const express = require("express");
const router = express.Router();

const { ensureAuthenticated } = require("../../helpers/auth");

// Route: api/charts

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("interactivechart", {});
});

module.exports = router;
