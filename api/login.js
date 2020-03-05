const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const isEmpty = require('is-empty');

const User = require('../models/User');
const keys = require('../config/keys');

async function validateInput(data)
{
	var errors = {};

	if (isEmpty(data.email) || validator.isEmpty(data.email))
	{
		errors.email = 'email required';
	}

	if (isEmpty(data.password) || validator.isEmpty(data.password))
	{
		errors.password = 'password required';
	}

	return {errors, isValid: isEmpty(errors)};
};

router.post('/api/login', async function(req, res, next)
{
	console.log('Express: POST /api/login');

	const validation = await validateInput(req.body);

	if (validation.isValid)
	{
		User.findOne({email: req.body.email}, function(err, user)
		{
			if (err)
			{
				res.status(500).json({success: false, errors: 'failed to login'});
			}
			else if (!user)
			{
				res.status(400).json({success: false, errors: 'bad login'});
			}
			else
			{
				bcrypt.compare(req.body.password, user.password, function(err, isMatch)
				{
					if (err)
					{
						console.log(err);
					}

					if (isMatch)
					{
						const payload = {
						  id: user.id,
						  email: user.email,
						  name: user.name,
						};

						jwt.sign(payload, keys.secretOrKey, {expiresIn: 7200}, function(err, token)
						{
							res.status(200)
							   .cookie('session', token, {httpOnly: true, expires: 0})
							   .json({success: true});
						});
					}
					else
					{
						res.status(400).json({success: false, errors: 'bad login'})
					}
				});
			}
		});
	}
	else
	{
		res.status(400).json({success: false, errors: validation.errors});
	}
});

module.exports = router;