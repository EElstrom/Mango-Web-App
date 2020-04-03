const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('is-empty');

const Device = require('../models/device');
const keys = require('../config/keys');

// device establishes jwt with api using its personal _id
async function validateInput(data)
{
	const errors = {};

	if (isEmpty(data.id) || validator.isEmpty(data.id))
	{
		errors.email = 'device id required';
	}  
	return {
        errors, 
        isValid: isEmpty(errors)
    };
};

router.post('/api/deviceLogin', async (req, res) => 
{
	console.log('Express: POST /api/deviceLogin');

	const validation = await validateInput(req.body);

	if (validation.isValid)
	{
		Device.findOne({
            _id: req.body.id
            }, (err, device) => {
                if (err)
                {
                    res
                        .status(500)
                        .json({
                            success: false,
                            errors: 'failed to login'
                        });
                }
                else if (!device)
                {
                    res
                        .status(400)
                        .json({
                            success: false, 
                            errors: 'bad login'
                        });
                }
                else
                {
                    const payload = {
                        id: device.id,
                        alias : device.alias,
                        postFrequency : device.postFrequency,
                        location : device.location
                    };

                    jwt.sign(payload, keys.secretOrKey, {expiresIn: '12h'}, (err, token) => {
                        res
                            .status(200)
                            .cookie('session', token, {
                                httpOnly: true, 
                                expires: 0
                            })
                            .json({
                                success: true,
                            });
                    });
                }

            });
    }	
	else
	{
        res
            .status(400)
            .json({
                success: false, 
                errors: validation.errors
            });
	}
});

module.exports = router;