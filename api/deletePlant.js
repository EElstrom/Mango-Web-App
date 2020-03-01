const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('is-empty');

const keys = require('../config/keys');

const Plant = require('../models/plant');

function validateInput(data)
{
	var errors = {};

	if (isEmpty(data.id) || validator.isEmpty(data.id))
		errors.id = 'missing id';

	return {errors, isValid: isEmpty(errors)};
};

router.post('/api/deletePlant', function(req, res, next)
{
	console.log('Express: POST /api/deletePlant');

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
				Plant.deleteOne({_id: req.body.id, userId: user.id}, function(err)
				{
					if (err)
					{
						console.log(err);
						res.status(500).json({success: false, errors: 'failed to delete plant'});
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
=======
const validator = require('validator');
const isEmpty = require('is-empty');

const Plant = require('../models/plant');

// should only be able to do this if in session, should be webtoken this?

// to be deleted, the plant should be clicked on, and the id should be supplied to the api
function validateInput(data)
{
    var errors = {};

    if (isEmpty(data.id) || validator.isEmpty(data.id))
    {
        errors.id = 'missing id';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

router.post('./api/deletePlant', (req, res) => {
    console.log('POST in deletePlant');

    // ignoring jwt stuff for now
    
    const validation = validateInput(req.body);

    if (validation.isValid)
    {
        Plant.deleteOne({
            plantID: req.body.id
        }, (err) => {
            if (err)
            {
                console.log(err);
                res.status(500).json({
                    success: false,
                    errors: 'error: could not delete plant'
                });
            }

            else
            {
                res.status(200).json({
                    success: true
                });
            }
        });
    }

    else
    {
        res.status(400).json({
            success: false,
            errors: validation.errors
        });
    }
>>>>>>> 8acbe7b289013b574d3f7754124490ee122d187a
});

module.exports = router;