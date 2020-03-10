// editing user info:password, email, name, location

const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const keys = require('../config/keys');
const User = require('../models/user');

// can only edit a user by being logged in
// verify against user PK ID
function validateInput(data)
{
    var errors = {};

    if (isEmpty(data.id) || validator.isEmpty(data.id))
    {
        errors.id = 'missing id - cannot verify user'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

router.post('/api/editUser', (req, res) => {
    console.log('POST in editUser');

    const authToken = req.cookies.session;

    jwt.verify(authToken, keys.secretOrKey, (err, user) => {
        // did not verify jwt
        if (err || !user)
        {
            res.status(401).json({
                success: false,
                errors: 'denied: please log in'
            });
        }
        
        else
        {
            const validation = validateInput(req.body);

            if (validation.isValid)
            {
                // fields should contain current data prefilled excepting password
                update = {};
                
                // salting/hashing password
                // frontend must verify that both fields have same string
                if (req.body.password)
                    update.password = bcrypt.hashSync(req.body.password, 10);
                
                if (req.body.email)
                    update.email = req.body.email;

                if (req.body.name)
                    update.name = req.body.name;
                
                if (req.body.location)
                    update.location = req.body.location;

                User.findOneAndUpdate({
                    _id: req.body.id, // PK
                    
                }, update, (err, device) => {
                    if (err)
                    {
                        console.log(err);
                        res.status(500).json({
                            success: false,
                            errors: 'failed to edit user'
                        });
                    }

                    else
                    {
                        res.status(400).json({success: true});
                    }
                }); // end findOneAndUpdate
            }

            // validation errors
            else
            {
                res.status(400).json({
                    success: false,
                    errors: validation.errors
                });
            }
        }
    }); // end jwt.verify    
}); // end post

module.exports = router;