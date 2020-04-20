// HAS SPECIAL REQUEST BODY REQUIREMENTS, IS CALLED BY USER
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('is-empty');

const keys = require('../config/keys');
const Condition = require('../models/conditions');

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

// will return all conditions if no query specified
// note: these entries are specifically for that date and 12hour range, they are the most recent
// if we want MOST RECENT, maybe we should include a tag in the body:
    // {'mostRecent':'true'}
// searching based on temperature not currently implemented
router.post('/api/getConditions', (req, res) => {
    console.log("POST in /api/getConditions");

    const authToken = req.cookies.session;

    const validation = validateInput(req.body);

    const query = (!isEmpty(req.body.query) ? req.body.query : '');
    console.log("query is: " + query);

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
            // POST {'deviceID':'deviceID', 'mostRecent': false, 'query':'time'} or {'deviceID' :'deviceID', 'mostRecent':'true'}
            // if mostRecent is true, it will only return the one condition, ignoring all other query parameters.
            // time is a string: "HHMM" format
            else
            {                           
                var request = {};

                request.deviceID = req.body.deviceID;

                // mostRecent: true, one only. 
                if (req.body.mostRecent == 'true')
                {
                    Condition
                        .find(request, (err, arr) => {
                            if (err)
                            {
                                console.log(err);
                                res
                                    .status(500)
                                    .json({
                                        success: false,
                                        errors: 'failed to search conditions'
                                    });
                            }
                            else
                            {
                                const conditions = [];
                                for (i = 0; i < arr.length; i++)
                                {
                                    const condition = JSON.parse(JSON.stringify(arr[i]));
                                    delete condition.deviceID; 
                                    delete condition.__v;
                                    conditions.push(condition);
                                }
                                
                                res
                                    .status(200)
                                    .json({
                                        success: true,
                                        conditions: conditions
                                    });
                            }
                        })
                        .sort({
                            _id: -1
                        })
                        .limit(1);
                }
                // search using query or retrieving all conditions
                else 
                {
                    if (query)
                    {
                        request = {
                            $or : [
                                {time : {$regex: '.*' + query + '.*', $options: 'i'}}
                            ]
                        };

                        console.log("request is: " + request);
                    }
                
                    Condition
                        .find(request, (err, arr) => {
                            // errors most likely due to regex issues
                            if (err)
                            {
                                console.log(err);
                                res
                                    .status(500)
                                    .json({
                                        success: false,
                                        errors: 'failed to search conditions'
                                    });
                            }
                            else
                            {
                                const conditions = [];
                                for (i = 0; i < arr.length; i++)
                                {
                                    const condition = JSON.parse(JSON.stringify(arr[i]));
                                    delete condition.deviceID; 
                                    delete condition.__v;
                                    conditions.push(condition);
                                }
                                
                                res
                                    .status(200)
                                    .json({
                                        success: true,
                                        conditions: conditions
                                    });
                            }
                        })
                        .sort({
                            _id: -1
                        });
                }
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
