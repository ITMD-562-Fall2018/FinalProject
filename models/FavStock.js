const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favSchema = new Schema({
  Name: String,
  Symbol: {
    type: String
  },
  LastPrice: {
    type: Number
  },
  Change: {
    type: Number
  },
  ChangePercent: {
    type: Number
  },
  MarketCap: {
    type: Number
  },
  Volume: {
    type: Number
  },
  ChangeYTD: {
    type: Number
  },
  ChangePercentYTD: {
    type: Number
  },
  High: {
    type: Number
  },
  Low: {
    type: Number
  },
  Open: {
    type: Number
  },
  DateCreated: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Object
  }
});

let FavStock = mongoose.model("favStock", favSchema);

module.exports = FavStock;
