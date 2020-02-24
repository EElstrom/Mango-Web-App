const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');

const Device = require('../models/device');

// validation only requires name, all other attributes currently unrequired
function validateDevice(data)
{
    // can this be "const errors" to maintain js version?
    var errors = {};

    if (isEmpty(data.name) || validator.isEmpty(data.name))
    {
        errors.name = 'device name required';
    }

    // ensure device name is unique
    // I'm not convinced exists() will check correct table, I think it needs more specification
    else
    {
        await Device.exists({
            name: data.name
        }, (err, result) => {
            if (err)
                errors.name = 'unable to verify device availability'
            if (result)
                errors.name = 'device already exists under that name'
        });
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

        Device.create(newDevice, (err,device) => {
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