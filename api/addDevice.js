const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const Device = require('../models/device');

// a device requires:
    // userID it belongs to
    // a name, default "sensor" + next number
    // postFrequency: defaulted to 4 on first registration always

// Right now, duplicate reigstration of the same device is allowed
// Will be able to enforce uniqueness based on what the device posts to the api
/*
async function validateDevice(data)
{
    const errors = {};
    await User.exists({
            userID: userID,
            r: r,
        }, (err, result) => {
            if (err)
            {
                errors.userID = 'user doesn't exist'
                errors.r = 'r doesn't match'
            }
            if (result)
               console.log("user found");
        });

    return {
        errors, 
        isValid: isEmpty(errors) // empty errors denotes success
    };
};
*/

// this version is relying on jwt from the user, if this is instead coming from the device itself, we'll need to change validation
// the post payload to this endpoint is expecting the user._id to be passed in userID field
// potentially a random number associated with the user table, which is passed to device, then verified here
router.post('/api/addDevice', (req, res) => {
    
    console.log('Express: POST /api/addDevice');
    console.log("Req has id: %s", req.body.userID);

    const authToken = req.cookies.session;
    
    jwt.verify(authToken, keys.secretOrKey, (err, user) => {
        if (err | !user)
            res
                .status(401)
                .json({
                    success: false,
                    errors: "access denied, please log in"
                })
        
        else
        {
            Device.countDocuments({}, (err, count) => {
                if (err)
                {
                    console.log("Could not countDocuments()")
                    console.log(err);
                }
                else
                {
                    console.log("Found %d devices", count);
                    nextNumber = count + 1;
                    const newDevice = new Device({
                        userID : req.body.userID, 
                        alias: "Sensor" + nextNumber,
                        postFrequency: 4
                    });

                    Device.create(newDevice, (err, device) => {
                        if (err)
                        {
                            console.log(err);
                            res
                                .status(500)
                                .json({
                                    success: false, 
                                    errors: 'failed to register device'});
                        }        
                        else
                        {
                            res
                                .status(200)
                                .json({success: true});
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
