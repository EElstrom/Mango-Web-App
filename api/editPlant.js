const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const Plant = require('../models/device');

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

router.post('/api/editPlant', (req, res) => {
    console.log('POST in editPlant');

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
                update = {};

                // Lots of options to update:
                // name, notes, deviceName, type, temperatureTolerance
                // lightTolerance, phTolerance, humidityTolerance
                if (req.body.name)
                    update.name = req.body.name;
                if (req.body.notes)
                    update.notes = req.body.notes;
                if (req.body.deviceName)
                    update.deviceName = req.body.deviceName;
                if (req.body.type)
                    update.type = req.body.type;
                if (req.body.temperatureTolerance)
                    update.temperatureTolerance = req.body.temperatureTolerance;
                if (req.body.lightTolerance)
                    update.lightTolerance = req.body.lightTolerance;
                if (req.body.phTolerance)
                    update.phTolerance = req.body.phTolerance;
                if (req.body.humidityTolerance)
                    update.humidityTolerance = req.body.humidityTolerance;

                Plant.findOneAndUpdate({
                    _id : req.body.id,
                    userID : user.id
                }, update, (err, plant) => {
                    if (err)
                    {
                        console.log(err);
                        res
                            .status(500)
                            .json({
                                success: false,
                                errors: 'failed to edit plant'
                            });
                    }
                    else
                    {
                        res
                            .status(400)
                            .json({
                                success : true
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