const config = require("./index");

const passportJwt = require("passport-jwt");
const Strategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const User = require("../models/user");
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

// strategia uruchamia sie przy chrionionych routach, sprawdza token
const jwtAuthStrategy = new Strategy(options, (jwtPayload, done) => {
  User.findById(jwtPayload.id)
    .then(user => {
      if (user) {
        return done(null, {
          id: user._id,
          name: user.userName,
          email: user.emailAddress
        });
      }
      return done(null, false);
    })
    .catch(err => console.error(err));
});

module.exports = jwtAuthStrategy;
