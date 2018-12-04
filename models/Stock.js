const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  Name: {
    type: String
  },
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

let Stock = mongoose.model("stock", stockSchema);

module.exports = Stock;
