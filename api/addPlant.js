const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');

const keys = require("../config/keys");
const Plant = require('../models/plant');

// validate only requires the name, the userID should be supplied by jwt
// currently checks if a plant has been added under a certain device, or no device
// a search feature could include a devices name/alias to bring up those plants
async function validateinput(data)
{
    const errors = {};

    // determine both required fields are filled
    if (isEmpty(data.name) || validator.isEmpty(data.name))
    {
        errors.name = 'name required'
    }
    
    else
    {
        await Plant.exists({
            name: data.name,
            deviceName: data.deviceName
        }, (err, result) => {
            if (err)
                errors.name = 'unable to verify plant availability';
            if (result)
                errors.name = 'plant already exists under that device.';
        });
    }

    return {
        errors, 
        isValid: isEmpty(errors) // no errors logged if name and deviceName do not match
    };
};

router.post('/api/addPlant', async (req, res) => {
    console.log('POST in addPlant');

    const authToken = jwt.cookies.session;

    jwt.verify(authToken, keys.secretOrKey, (err, user) => {
        if (err | !user)
        {
            res
                .status(401)
                .json({
                    success: false,
                    errors: "access denied, please log in"
                })
        }        
        else
        {
            const validation = validateInput(req.body);

            console.log("user is: %s", user.id);

            if (validation.isValid)
            {
                const pnotes = ((req.body.notes) ? req.body.notes : '');
                const dName = ((req.body.deviceName) ? req.body.deviceName : '');
                const pType = ((req.body.type) ? req.body.type : '');
                const tempTol = ((req.body.temperatureTolerance) ? req.body.temperatureTolerance : '');
                const lightTol = ((req.body.lightTolerance) ? req.body.lightTolerance : '');
                const phTol = ((req.body.phTolerance) ? req.body.phTolerance : '');
                const humTol = ((req.body.humidityTolerance)  ? req.body.humidityTolerance : '');

                const newPlant = new Plant({
                    userID: user.id,
                    name : req.body.name,
                    notes : pnotes,
                    deviceName : dName,
                    type : pType,
                    temperatureTolerance : tempTol,
                    lightTolerance : lightTol,
                    phTolerance : phTol,
                    humidityTolerance : humTol
                });

                // .create() to package and send to db
                Plant.create(newPlant, (err, result) => {
                    if (err)
                    {
                        console.log(err);
                        res
                            .status(500)
                            .json({
                                success: false,
                                errors: 'failed to add plant'
                            });
                    }

                    else
                    {
                        res
                            .status(200)
                            .json({success: true});
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

