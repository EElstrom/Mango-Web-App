const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
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

// POST {id : this.id} or however the id is stored in front
router.post('/api/deletePlant', (req, res) => {
    console.log('POST in deletePlant');
    
    const validation = validateInput(req.body);

    const authToken = req.cookies.session;

    jwt.verify(authToken, keys.secretOrKey, (err, user) => {
        if (err || !user)
        {
            res
                .status(401)
                .json({
                    success: false,
                    errors: 'access denied, please login'
                });
        }
        else
        {
            if (validation.isValid)
            {
                Plant.deleteOne({
                    _id: req.body.id
                }, (err) => {
                    if (err)
                    {
                        console.log(err);
                        res
                            .status(500)
                            .json({
                                success: false,
                                errors: 'error: could not delete plant'
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
        }
    });
});
    
module.exports = router;