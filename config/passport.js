const JwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/Users');
const keys = require('keys');

const opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport =>
{
	passport.use(
		new JwtStrategy(opts, function (jwt_payload, done)
		{
			User.findById(jwt_payload.id).then(function (user)
			{
				if (user)
				{
					return done(null, user);
				}
				return done(null, false);
			}).catch(err => console.log(err));
		});
};
