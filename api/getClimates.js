const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('is-empty');

const keys = require('../config/keys');
const Climate = require('../models/climate');

// requires deviceID from whichever sensor is being asked of
// MUST be present in json request body
function validateInput(data)
{
    const errors = {};

    if (isEmpty(data.deviceID) || validator.isEmpty(data.deviceID))
    {
        errors.deviceID = 'device ID required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

// supports search based on date
router.post('/api/getClimates', (req, res) => {
    console.log("POST in /api/getClimates");

    const authToken = req.cookies.session;

    const validation = validateInput(req.body);

    if (validation.isValid)
    {
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
            // POST {'deviceID':'deviceID', 'query' : 'query'} or empty query
            // query date must be in "MMDDYYYY" format, as a string.
            else
            {
                const query = (!isEmpty(req.body.query) ? req.body.query : '');
                            
                var request = {};

                request.deviceID = req.body.deviceID;

                // search function for string conditionals
                if (query)
                {
                    request = {
                        $or : [
                            {date : {$regex: '.*' + query + '.*', $options: 'i'}}
                        ]
                    };
                }

                Climate
                    .find(request, (err, arr) => {
                        // errors most likely due to regex issues
                        if (err)
                        {
                            console.log(err);
                            res
                                .status(500)
                                .json({
                                    success: false,
                                    errors: 'failed to search climates'
                                });
                        }
                        else
                        {
                            const climates = [];
                            for (i = 0; i < arr.length; i++)
                            {
                                const climate = JSON.parse(JSON.stringify(arr[i]));
                                delete climate.deviceID; 
                                delete climate.__v;
                                climates.push(climate);
                            }
                            
                            res
                                .status(200)
                                .json({
                                    success: true,
                                    cliamtes: climate
                                });
                        }
                    })
                    .sort({
                        date: -1
                    });
            }
        });
    }

    else
    {
        console.log(validation.errors);
        res
            .status(400)
            .json({
                success: false,
                errors: validation.errors
            });
    }
});


module.exports = router;
