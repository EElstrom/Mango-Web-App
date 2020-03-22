const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
<<<<<<< Updated upstream
 
=======
  
>>>>>>> Stashed changes
const Plant = require('../models/plant');

// should only be able to do this if in session, should be webtoken this?

// to be deleted, the plant should be clicked on, and the id should be supplied to the api
function validateInput(data)
{
    var errors = {};

    if (isEmpty(data.id) || validator.isEmpty(data.id))
    {
        errors.id = 'missing id';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

router.post('./api/deletePlant', (req, res) => {
    console.log('POST in deletePlant');

    // ignoring jwt stuff for now
    
    const validation = validateInput(req.body);

    if (validation.isValid)
    {
        Plant.deleteOne({
            plantID: req.body.id
        }, (err) => {
            if (err)
            {
                console.log(err);
                res.status(500).json({
                    success: false,
                    errors: 'error: could not delete plant'
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