const express = require('express');
const router = express.Router();
const validator = require('valildator');
const isEmpty = require('is-empty');

const jwt = require('jsonwebtoken');
const keys = reqire('../config/keys');

const Plant = require('../models/plant');

// validation needs to have all required fields filled out, not just one
// validate: name, deviceName (deviceName matched to registered devices?) only
// then check to see if plant has already been added

async function validateinput(data)
{
    var errors = {};

    // determine both required fields are filled
    if (isEmpty(data.name) || validator.isEmpty(data.name))
    {
        errors.name = 'name required'
    }

    else if (isEmpty(data.deviceName) || validator.isEmpty(data.deviceName))
    {
        errors.deviceName = 'device name required.'
    }
    
    // a plant with a different sensor may be added, to prevent doubles, both params must be checked against db
    else
    {
        // using await? 
        // use .exists() to specify this particular entry
        // NOTE: if exists() does not work, findOne() should instead
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
        isValid: isEmpty(errors)
    };
};

router.post('/api/addPlant', async (req, res) => {
    console.log('POST in addPlant');

    const validation = await validateInput(req.body);

    if (validation.isValid)
    {
        // can now send the body packet to the db
        // I don't see a reason to encrypt this part.
        const newPlant = new Plant({
            // plantId : req.body.plantId,
            name : req.body.name,
            alias : req.body.alias,
            deviceName : req.body.deviceName,
            type : req.body.type,
            temperatureTolerance : req.body.temperatureTolerance,
            lightTolerance : req.body.lightTolerance,
            phTolerance : req.body.phTolerance,
            humidityTolerance : req.body.humidityTolerance
        });

        // .create() to package and send to db
        Plant.create(newPlant, (err, result) => {
            if (err)
            {
                console.log(err);
                res.status(500).json({
                    success: false,
                    errors: 'failed to add plant'
                });
            }

            else
            {
                res.status(200).json({
                    success: true
                });
            }
        });
    }

    else
    {
        res.status(400).json({
            success: false, 
            errors: validation.errors
        });
    }
});

module.exports = router;

