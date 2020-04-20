const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const isEmpty = require('is-empty');

const User = require('../models/user');
const keys = require('../config/keys');

// logging in requires the email and password
async function validateInput(data)
{
	const errors = {};

	if (isEmpty(data.email) || validator.isEmpty(data.email))
	{
		errors.email = 'email required';
	}

	if (isEmpty(data.password) || validator.isEmpty(data.password))
	{
		errors.password = 'password required';
	}
  
	return {
        errors, 
        isValid: isEmpty(errors)
    };
};

router.post('/api/login', async (req, res, ) => {
	console.log('Express: POST /api/login');

	const validation = await validateInput(req.body);

	if (validation.isValid)
	{
		User.findOne({
            email: req.body.email
            }, (err, user) =>{
                if (err)
                {
                    res
                        .status(500)
                        .json({
                            success: false,
                            errors: 'failed to login'
                        });
                }
                else if (!user)
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
                    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                        if (err)
                        {
                            console.log(err);
                        }

                        if (isMatch)
                        {
                            if (!user.verified)
                            {
                                res
                                    .status(201)
                                    .json({
                                        success: false,
                                        errors: 'please verify your account'
                                    });
                            }
                            else
                            {
                                const payload = {
                                    id: user.id,
                                    email: user.email,
                                    verified: user.verified,
                                    authCode: user.authCode,
                                    name: user.name,
                                    location: user.location,
                                    noOfDevices: user.noOfDevices
                                    };

                                jwt.sign(payload, keys.secretOrKey, {expiresIn: 7200}, (err, token) => {
                                    res
                                        .status(200)
                                        .cookie('session', token, {
                                            httpOnly: true, 
                                            expires: 0
                                        })
                                        .json({
                                            success: true,
                                            token: token
                                        });
                                });
                            }
                        }
                        else
                        {
                            res
                                .status(401)
                                .json({
                                    success: false, 
                                    errors: 'bad login'
                                })
                        }
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