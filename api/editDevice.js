const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');

const Device = require('../models/device');

// can only edit device by being logged in and clicking on it
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

router.post('/api/editDevice', (req, res) => {
    console.log('POST in editDevice');

    const validation = validateInput(req.body);

    if (validation.isValid)
    {
        // update the device with new data from the fields given in the app
        // create empty update: can have up to but no more than what the Schema dictates

        update = {};
        
        // outta time, finish it later.
    }
});