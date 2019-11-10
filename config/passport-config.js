const passportJwt = require('passport-jwt');
const User = require('../routes/user/userModel');
const config = require('./index');

const Strategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

// strategia uruchamia sie przy chrionionych routach, sprawdza token
const jwtAuthStrategy = new Strategy(options, (jwtPayload, done) => {
  User.findById(jwtPayload._id)
    .then(user => {
      if (user) {
        return done(null, {
          _id: user._id,
          userName: user.userName,
        });
      }
      return done(null, false);
    })
    .catch(err => console.error(err));
});

module.exports = jwtAuthStrategy;
