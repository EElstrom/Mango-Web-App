const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('is-empty');

const keys = require('../config/keys');
const Device = require('../models/device');

// supports search
router.post('/api/getDevices', (req, res) => {
    console.log("POST in /api/getDevices");

    const authToken = req.cookies.session;

    jwt.verify(authToken, keys.secretOrKey, (err, user) => {
        if (err || !user)
        {
            res
                .status(401)
                .json({
                    success: false,
                    errors: "access denied, please log in"
                });
        }
        // POST {'query' : 'query'} or empty
        else
        {
            const query = (!isEmpty(req.body.query) ? req.body.query : '');

            // I'm not sure these are actually necessary, theres no way for frontend to supply this
            const alias = (!isEmpty(req.body.alias) ? req.body.alias : '');
            const postFrequency = (!isEmpty(req.body.postFrequency) ? req.body.postFrequency : '');
            const location = (!isEmpty(req.body.location) ? req.body.location : '');
            
            var request = {};

            request.userID = user.id;

            // search function for string conditionals
            if (query)
            {
                request = {
                    $or : [
                        {alias : {$regex: '.*' + query + '.*', $options: 'i'}},
                        {location: {$regex: '.*' + query + '.*', $options: 'i'}}
                    ]
                };
            }

            Device
                .find(request, (err, arr) => {
                    // errors most likely due to regex issues
                    if (err)
                    {
                        console.log(err);
                        res
                            .status(500)
                            .json({
                                success: false,
                                errors: 'failed to search devices'
                            });
                    }
                    else
                    {
                        const devices = [];
                        for (i = 0; i < arr.length; i++)
                        {
                            const device = JSON.parse(JSON.stringify(arr[i]));
                            delete device.userID; // hide user._id
                            delete device.__v;
                            devices.push(device);
                        }
                        
                        res
                            .status(200)
                            .json({
                                success: true,
                                devices: devices
                            });
                    }
                })
                .sort({
                    alias: 1
                });
        }
    });
});

module.exports = router;