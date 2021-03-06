// endpoint to verify the code sent by an email
// they input the code, click the button, the button will look up that user and log them in.
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

	if (isEmpty(data.authCode) || validator.isEmpty(data.authCode))
	{
		errors.email = 'authorization code required';
	}
  
	return {
        errors, 
        isValid: isEmpty(errors)
    };
};

router.post('/api/verify', async (req, res, ) => {
	console.log('Express: POST /api/verify');

    const validation = await validateInput(req.body);
    
    ACode = parseInt(req.body.authCode);

	if (validation.isValid)
	{
		User.findOne({
            authCode: ACode,
            verified: false
            }, (err, user) =>{
                if (err)
                {
                    res
                        .status(500)
                        .json({
                            success: false,
                            errors: 'No user to verify'
                        });
                }
                else if (!user)
                {
                    res
                        .status(400)
                        .json({
                            success: false, 
                            errors: 'bad authorization code'
                        });
                }
                else
                {
                    User.findOneAndUpdate({
                        _id : user.id
                    }, {
                        verified : true
                    }, (err, user) => {
                        if (err)
                            console.log(err);
                    });

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