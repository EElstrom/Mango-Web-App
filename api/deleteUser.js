const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const User = require('../models/user');

// should only be able to do this if in session, should be webtoken this?

// to be deleted, the plant should be clicked on, and the id should be supplied to the api
function validateInput(data)
{
    var errors = {};

    if (isEmpty(data.email) || validator.isEmpty(data.email))
    {
        errors.id = 'missing id';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

// POST {id : this.id} or however the id is stored in front
router.post('/api/deleteUser', (req, res) => {
    console.log('POST in deleteUser');
    
    const validation = validateInput(req.body);
    if (validation.isValid)
    {
        console.log("Attempting to delete: " + req.body.email);
        User.deleteOne({
            email: req.body.email
        }, (err) => {
            if (err)
            {
                console.log(err);
                res
                    .status(500)
                    .json({
                        success: false,
                        errors: 'error: could not delete user'
                    });
            }
            else
            {
                res
                    .status(200)
                    .json({
                        success: true
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
        
});
    
module.exports = router;