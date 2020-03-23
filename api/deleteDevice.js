const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const Device = require('../models/device');
const Condition = require('../models/conditions');
const Climate = require('../models/climate');

// can only delete device by being logged in and clicking on it
// needs its ID, which is expected to be passed in the request body
// note: bringing up the sensors belonging to a user should be sorted by user._id
function validateInput(data)
{
    const errors = {};

    if (isEmpty(data.id) || validator.isEmpty(data.id))
    {
        errors.id = 'missing id'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

// post request must only send {id : this.id}
// getDevice endpoint should return an array of Device objects, which will have ID's in their payload 
router.post('/api/deleteDevice', (req, res) => {
    console.log('POST in deleteDevice');

    const authToken = req.cookies.session;

    // verify user
    jwt.verify(authToken, keys.secretOrKey, (err, user) => {
        if (err || !user)
        {
            res
                .status(401)
                .json({
                    success: false,
                    errors: 'access denied, please login'
                });
        }
        else
        {
            const validation = validateInput(req.body);

            if (validation.isValid)
            {
                // delete entries in other tables belonging to this device
                // remove all entries in conditions table
                Condition.deleteMany({
                    deviceID : req.body.id
                }, (err) => {
                    if (err)
                    {
                        console.log(err);
                        res
                            .status(400)
                            .json({
                                success: false,
                                errors: 'error: could not delete Conditions'
                            });
                    }

                    else
                    {
                        res
                            .status(200)
                            .json({
                                success: true
                            });
                    }
                });

                // remove all entries in climate table
                Climate.deleteMany({
                    deviceID : req.body.id
                }, (err) => {
                    if (err)
                    {
                        console.log(err);
                        res
                            .status(400)
                            .json({
                                success: false,
                                errors: 'error: could not delete Climate'
                            });
                    }

                    else
                    {
                        res
                            .status(200)
                            .json({
                                success: true
                            });
                    }
                });

                Device.deleteOne({
                    _id : req.body.id,
                    userID : user.id
                }, (err) => {
                    if (err)
                    {
                        console.log(err);
                        res
                            .status(400)
                            .json({
                                success: false,
                                errors: 'error: could not delete Device'
                            });
                    }

                    else
                    {
                        res
                            .status(200)
                            .json({
                                success: true
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
        }
    });
});

module.exports = router;