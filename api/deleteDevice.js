const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
 
const Device = require('../models/device');

// can only delete device by being logged in and clicking on it
// needs its ID
function validateInput(data)
{
    var errors = {};

    if (isEmpty(data.id) || validator.isEmpty(data.id))
    {
        errors.id = 'missing id'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

router.post('./api/deleteDevice', (req, res) => {
    console.log('POST in deleteDevice');

    const validation = validateInput(req.body);

    if (validation.isValid)
    {
        Device.deleteOne({
            deviceID: req.body.id
        }, (err) => {
            if (err)
            {
                console.log(err);
                res.status(400).json({
                    success: false,
                    errors: 'error: could not delete Device'
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