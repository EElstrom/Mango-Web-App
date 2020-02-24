const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');

const Device = require('../models/device');

// How to adquately prove a device doesn't exist?
// TODO: decide whether to prevent doubles on devices

// validation only requires name, all other attributes currently unrequired
function validateDevice(data)
{
    // can this be const errors to maintain js version?
    var errors = {};

    if (isEmpty(data.name) || validator.isEmpty(data.name))
    {
        errors.name = 'device name required';
    }

    return {
        errors, 
        isValid:isEmpty(errors)
    };
};

router.post('/api/addDevice', (req,res,) => {
    console.log('Express: POST /api/addDevice');

    const validation = validateInput(req.body);

    // I still don't understand how the ID's are assigned, since the DB does it.
    if (validation.isValid)
    {
        const newDevice = new Device({
            deviceId : device.id,
            name: req.body.name,
            location: req.body.location,
            installDate: req.body.installDate
        });

        device.create(newDevice, (err,device) => {
            if (err)
            {
                console.log(err);
                res.status(500).json({
                    success: false, 
                    errors: 'failed to register device'});
            }

            else
            {
                res.status(200).json({success: true});
            }
        });
    }

    else
    {
        res.status(400).json({
            success: false, 
            errors: validation.errors});
    }
});

module.exports = router;