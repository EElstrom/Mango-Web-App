// editing a device should only change its alias, location, and/or postFrequency. 
// if de-registering a device, a new endpoint which is accessible from clicking "deregister" or something similar
// TODO: create '/api/deregisterDevice'

const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const Device = require('../models/device');

// can only edit device by being logged in and clicking on it
// needs its PK ID
function validateInput(data)
{
    var errors = {};

    if (isEmpty(data.id) || validator.isEmpty(data.id))
    {
        errors.id = 'missing id - cannot verify user'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

router.post('/api/editDevice', (req, res) => {
    console.log('POST in editDevice');

    const authToken = req.cookies.session;

    jwt.verify(authToken, keys.secretOrKey, (err, user) => {
        // did not verify jwt
        if (err || !user)
        {
            res.status(401).json({
                success: false,
                errors: 'denied: please log in'
            });
        }
        
        else
        {
            const validation = validateInput(req.body);

            if (validation.isValid)
            {
                // update the device with new data from the fields given in the app
                // fields in front end should fill in with current details
                // TODO: create '/api/getDeviceInfo' for these fields.
                update = {};

                // safeguard against accidentally empty fields
                if (req.body.alias)
                    update.alias = req.body.alias;
                
                if (req.body.postFrequency)
                    update.postFrequency = req.body.postFrequency;
                
                if (req.body.location)
                    update.location = req.body.location;
                
                Device.findOneAndUpdate({
                    _id: req.body.id, // PK
                    userID: user.id // FK
                    
                }, update, (err, device) => {
                    if (err)
                    {
                        console.log(err);
                        res.status(500).json({
                            success: false,
                            errors: 'failed to edit device'
                        });
                    }

                    else
                    {
                        res.status(400).json({success: true});
                    }
                }); // end findOneAndUpdate
            }

            // validation errors
            else
            {
                res.status(400).json({
                    success: false,
                    errors: validation.errors
                });
            }
        }
    }); // end jwt.verify    
}); // end post

module.exports = router;