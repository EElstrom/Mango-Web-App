const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator');
const isEmpty = require('is-empty');

const User = require('../models/user');

// Determine if registration input is valid
async function validateInput(data)
{
	var errors = {};

	if (isEmpty(data.username) || validator.isEmpty(data.username))
	{
		errors.username = 'username required';
	}
	else
	{
		await User.find({username: data.username}, 'username', async function(err, users)
		{
			if (err)
				errors.username = 'failed to verify username availability';
			else if (users.length > 0)
				errors.username = 'username taken';
		});
	}

	if (isEmpty(data.password) || validator.isEmpty(data.password))
	{
		errors.password = 'password required';
	}
	else if (!validator.isLength(data.password, {min: 6, max: 30}))
	{
		errors.password = 'password must be between 6 and 30 characters';
	}

	if (isEmpty(data.firstname) || validator.isEmpty(data.firstname))
	{
		errors.firstname = 'firstname required';
	}

	if (isEmpty(data.lastname) || validator.isEmpty(data.lastname))
	{
		errors.lastname = 'lastname required';
	}

	if (isEmpty(data.email) || validator.isEmpty(data.email))
	{
		errors.email = 'email required';
	}
	else if (!validator.isEmail(data.email))
	{
		errors.email = "email is invalid";
	}
	else
	{
		await User.find({email: data.email}, 'email', async function(err, users)
		{
			if (err)
				errors.email = 'failed to verify email availability';
			else if (users.length > 0)
				errors.email = 'email taken';
		});
	}

	return {errors, isValid: isEmpty(errors)};
};

router.post('/api/register', async function(req, res, next)
{
	console.log('Express: POST /api/register');

	const validation = await validateInput(req.body);

	if (validation.isValid == true)
	{
		bcrypt.genSalt(10, function(err, salt)
		{
			bcrypt.hash(req.body.password, salt, function(err, hash)
			{
				if (err)
					console.log(err);

				const newUser = new User({
				  username: req.body.username,
				  password: hash,
				  firstname: req.body.firstname,
				  lastname: req.body.lastname,
				  email: req.body.email
				});

				User.create(newUser, function(err, user)
				{
					if (err)
					{
						console.log(err);
						res.status(500).json({success: false, errors: 'failed to register'});
					}
					else
					{
						res.status(200).json({success: true});
					}
				});
			});
		});
	}
	else
	{
		res.status(400).json({success: false, errors: validation.errors});
	}
});

module.exports = router;