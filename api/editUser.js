// editing user info:password, email, name, location

const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const keys = require('../config/keys');
const User = require('../models/user');

// no validation, can update to the same if necessary, will accept anything in fields
// might consider making sure fields are pre-filled with current info
// currently checks if field was sent at all, can be blank
// grab that from getUser endpoint
router.post('/api/editUser', (req, res) => {
    console.log('POST in /api/editUser');

    const authToken = req.cookies.session;

    jwt.verify(authToken, keys.secretOrKey, (err, user) => {
        if (err || !user)
        {
            res
                .status(401)
                .json({
                    success: false,
                    errors: 'access denied: please log in'
                });
        }
        else
        {
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
            
            console.log(update);

            User.findOneAndUpdate({
                _id: user.id                
            }, update, (err, device) => {
                if (err)
                {
                    console.log(err);
                    res
                        .status(500)
                        .json({
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
    }); // end jwt.verify    
}); // end post

module.exports = router;