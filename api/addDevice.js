const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');

const device = require('../models/device');

function validateDevice(data)
{
    var errors = {};
    var count = 0;

    if(!isEmpty(data.name) && !validator.isEmpty(data.name))
        count++;
    if(!isEmpty(data.location) && !validator.isEmpty(data.location))
        count++;
    if(!isEmpty(data.installDate) && !validator.isEmpty(data.installDate))
        count++;
    if(count < 1)
    {
        errors.count = 'request must include at least one device detail';
    }

    return{errors, isValid:isEmpty(errors)};
};

router.post('/api/addDevice', function(req,res,next)
{
    
    console.log('Express: POST /api/addDevice');

    const validation = validateInput(req.body);
    if(validation.isValid)
    {
        const newDevice = newDevice
        ({
            deviceId : device.id,
            name: req.body.name,
            location: req.body.location,
            installDate: req.body.installDate
        });
        device.create(newDevice,function(err,device)
        {
            if(err)
            {
                console.log(err);
                res.status(500).json({success: false, errors: 'failed to register device'})
            }
            else
            {
                res.status(200).json({success: true});
            }
        });
    }
    else
    {
        res.status(400).json({success: false, errors: validation.errors});
    }
});

module.exports = router;