const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('is-empty');

const keys = require('../config/keys');

const Device = require('../models/plant');

function validateInput(data)
{
	var errors = {};

	if (isEmpty(data.id) || validator.isEmpty(data.id))
		errors.id = 'missing id';

	return {errors, isValid: isEmpty(errors)};
};

router.post('/api/deleteDevice', function(req, res, next)
{
	console.log('Express: POST /api/deleteDevice');

	const authToken = req.cookies.session;

	jwt.verify(authToken, keys.secretOrKey, function(err, user)
	{
		if (err || !user)
		{
			res.status(401).json({success: false, errors: 'access denied: please login'});
		}
		else
		{
			const validation = validateInput(req.body);

			if (validation.isValid)
			{
				Device.deleteOne({_id: req.body.id, userId: user.id}, function(err)
				{
					if (err)
					{
						console.log(err);
						res.status(500).json({success: false, errors: 'failed to delete device'});
					}
					else
					{
						res.status(200).json({success: true});
					}
				});
			}
			else
			{
				res.status(400).json({success: false, errors: validation.errors})
			}
		}
	});
});

module.exports = router;