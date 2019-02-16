const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users')
const tKey = require('./keys').tokenKey;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = tKey;

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        console.log(jwt_payload);
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => {
                console.log(err);
            })
    }));
}