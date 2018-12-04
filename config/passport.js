const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//LOAD MODEL
const User = require("../models/User");

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email"
      },
      (email, password, done) => {
        // MATCH USER
        User.findOne({ Email: email }).then(user => {
          if (!user) {
            return done(null, false, { message: "No user found" });
          }
          // MATCH PASSWORD
          bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              done(null, user, { message: `Welcome, ${user.Name}` });
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        });
      }
    )
  );
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
