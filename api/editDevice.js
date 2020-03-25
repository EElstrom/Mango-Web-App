const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const Device = require('../models/device');

// verify that an id was sent
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
}

// checking to make sure frequency per hours is valid
// at minimum: checking once per
// at maximum: checking 60x per (once a minute would happen here, way too much but might be requested)
function isxValid(value)
{
    if (isNaN(value))
        return false;
    
    if (value < 1 || value > 60.0)
        return false;

    return true;
}

// checking hours specified
// at minimum: 1 hour
// at max: 2 days = 48 hours
function isyValid(value)
{
    if (isNaN(value))
        return false;
    
    if (value < 1 || value > 48.0)
        return false;
    
    return true;
}

// acquire the device _id from getDevices: {"_id": "-idStringHere-"}
// POST {id : "---", alias : "--", x : "NUMBER", y: "NUMBER", location : "--"}
router.post('/api/editDevice', (req, res) => {
    console.log('POST in editDevice');

    const validation = validateInput(req.body);

    const authToken = req.cookies.session;

    jwt.verify(authToken, keys.secretOrKey, (err, user) => {
        if (err || !user)
        {
            res
                .status(401)
                .json({
                    success: false,
                    errors: 'denied: please log in'
                });
        }
        
        else
        {
            if (validation.isValid)
            {
                // update any fields specified
                update = {};

                // safeguard against accidentally empty fields
                if (req.body.alias)
                    update.alias = req.body.alias;
                
                // based on sensor, this may be restricted
                /*
                algorithm: x times per y hours
                ex: 4 times per 2 hours = every 30 minutes

                frontend would need two fields that either have dropdown, or are manually entered
                API is currently guarded against NaN and extreme cases
                Minimum: once per two days
                Maximum: 60x per hour (once per minute)

                FOR SENSOR: convert back to minutes: 60/postFrequency
                FOR FRONTEND: report to user as minutes or hours depending on..
                    y = 0;
                    if (postFrequency <= 1)
                        y = round(1 / postFrequency);
                    else
                    {
                        x = round((60 / postFrequency) - (60 * y));
                        if (y = 48)
                            x = 0;
                    }

                    if (y && x)
                        message = "Every y hours and x minutes"
                    else if (y)
                        message = "Every y hours"
                    else
                        message = "Every x minutes"

                    
                */
                if (req.body.x && req.body.y)
                {
                    x = parseFloat(req.body.x);
                    y = parseFloat(req.body.y);

                    if (isxValid(x) && isyValid(y))
                    {
                        value = x * (1 / y);
                        update.postFrequency = value;
                    }
                }
                
                if (req.body.location)
                    update.location = req.body.location;
                
                Device.findOneAndUpdate({
                    _id: req.body.id, // PK
                    userID: user.id // FK                    
                }, update, (err, device) => {
                    if (err)
                    {
                        console.log(err);
                        res
                            .status(500)
                            .json({
                                success: false,
                                errors: 'failed to edit device'
                            });
                    }
                    else
                    {
                        res
                            .status(400)
                            .json({
                                success: true
                            });
                    }
                }); // end findOneAndUpdate
            }

            // validation errors
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
    }); // end jwt.verify    
}); // end post

module.exports = router;