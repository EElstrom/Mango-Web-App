const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('is-empty');

const keys = require('../config/keys');
const User = require('../models/user');

// will return all information that a user might want in association with their profile
router.post('/api/getUser', (req, res) => {
    console.log("POST in /api/getUser");

    const authToken = req.cookies.session;

    jwt.verify(authToken,keys.secretOrKey, (err, user) => {
        if (err || !user)
        {
            res
                .status(401)
                .json({
                    success: false,
                    errors: "access denied, please log in"
                });
        }
        else
        {
            User.findOne({
                _id : user.id
            }, (err, user) => {
                if (err || !user)
                {
                    res
                        .status(500)
                        .json({
                            success : false,
                            errors: "failed to retrieve User"
                        });
                }
                else
                {
                    res
                        .status(200)
                        .json({
                            name: user.name,
                            email: user.email,
                            location: user.location,
                            noOfDevices: user.noOfDevices
                        });
                }

            });
        }
    });
});

module.exports = router;