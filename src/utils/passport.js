const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secrets = require('../secrets');
const { User } = require('../models');

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secrets.jwtSecret
}

let strategy = new JwtStrategy(options, function(payload, next) {
  User.findOne({_id: payload.id}, function(err, user) {
      if(err) {
        return next(err, false);
      }
      if(user) {
        return next(null, user);
      } else {
        return next('user not found', false);
      }
  });
});

passport.use(strategy);

module.exports = passport;
