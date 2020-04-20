const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator');
const isEmpty = require('is-empty');
const nodemailer = require('nodemailer');

const User = require('../models/user');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testbedmailer@gmail.com',
        pass: 'ABC!12345'
    }
});

const authCode = Math.floor(100000 + Math.random() * 900000);
console.log(authCode);


// Determine if registration input is valid
async function validateInput(data)
{
	const errors = {};

    if (isEmpty(data.email) || validator.isEmpty(data.email))
    {
        errors.email = 'email required';
    }
    else
    {
        await User.find({
            email: data.email
        }, 'email', async (err, users) => {
                        if (err)
                            errors.email = 'failed to verify email availability';
                        else if (users.length > 0)
                            errors.email = 'email already in use';
                    });
    }

    if (isEmpty(data.password) || validator.isEmpty(data.password))
    {
        errors.password = 'password required';
    }
    else if (!validator.isLength(data.password, {min:6, max:30}))
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

    if (validation.isValid)
    {
        const mailOptions = {
            from: 'testbedmailer@gmail.com',
            to: req.body.email,
            subject: 'testing nodemailer',
            html: `<h1><center><u>Welcome to Mango!</u></center></h1>
                    <p><center>Here is your authorization code: <font style = courier><u><b>${authCode}</u></center><b></font>`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                console.log(err);
            else
                console.log('Email sent: ' + info.response);
        });

        // adding in encryption
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err)
                    console.log(err);

                const name = (isEmpty(req.body.name) ? '' : req.body.name);
                
                const newUser = new User({
                    email : req.body.email, 
                    password : hash,
                    verified: false,
                    authCode: authCode,
                    name: name,
                    location: '', 
                    noOfDevices: 0, // should be updated internally
                });                
                
                User.create(newUser, (err, user) => {
                    if (err)
                    {
                        console.log(err);
                        res
                            .status(500)
                            .json({
                                success: false, 
                                errors : 'failed to register user'
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

                }); // end create
            }); // end hash
        }); // end genSalt
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
