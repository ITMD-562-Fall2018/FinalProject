const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  Name: {
    type: String
  },
  Password: {
    type: String
  },
  Email: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

let User = mongoose.model("user", userSchema);

module.exports = User;
