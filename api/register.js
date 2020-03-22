const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator');
const isEmpty = require('is-empty');
<<<<<<< HEAD
<<<<<<< Updated upstream
//const bcrypt = require('bcryptjs');
=======
>>>>>>> 085a6f3073471ddc88a4023430b179197e8a8eea

=======
 
>>>>>>> Stashed changes
const User = require('../models/user');

// Determine if registration input is valid
async function validateInput(data)
{
<<<<<<< HEAD
	var errors = {};
 
    if (isEmpty(data.username) || validator.isEmpty(data.username))
=======
	const errors = {};

    if (isEmpty(data.email) || validator.isEmpty(data.email))
>>>>>>> 085a6f3073471ddc88a4023430b179197e8a8eea
    {
        errors.email = 'username required';
    }
    else
    {
        await User.find({email: data.email}, 'email', 
                        async (err,users) => {
                            if (err)
                                errors.username = 'failed to verify username availability';
                            else if (users.length > 0)
                                errors.username = 'username already in use';
                        });
    }

    if (isEmpty(data.password) || validator.isEmpty(data.password))
    {
        errors.password = 'password required';
    }
    else if (!validator.isLength(data.password,{min:6, max:30}))
    {
        errors.password = 'password must be between 6 and 30 characters long';
    }
    return {
        errors, 
        isValid: isEmpty(errors)
    };
};


router.post('/api/register', async (req, res) => {
    console.log('Express: POST /api/register');

    const validation = await validateInput(req.body);
    const test = 0;

    if (validation.isValid)
    // if (test)
    {
        // adding in encryption
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err)
                    console.log(err);
                
                const newUser = new User({
                    email : req.body.email, 
                    password : hash,
                    name: '',
                    location: '', 
                    noOfDevices: 0 // should be updated internally
                });                
                
                User.create(newUser, (err, user) => {
                    if (err)
                    {
                        console.log(err);
                        res.status(500).json({
                            success: false, 
                            errors : 'failed to register user'
                        });
                    }
                    else
                    {
                        res.status(200).json({
                            success: true
                        });
                    }

                }); // end create
            }); // end hash
        }); // end genSalt
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
