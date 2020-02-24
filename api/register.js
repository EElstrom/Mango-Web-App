const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');

const user = require('../models/user');

async function validateInput(data)
{
    var errors = {};

    if(isEmpty(data.username) || validator.isEmpty(data.username))
    {
        error.username = 'username required';
    }
    else
    {
        await user.find({username: data.username}, 'username',async function(err,users)
        {
            if(err)
                errors.username = 'failed to verify username availability';
            else if(users.length > 0)
                errors.username = 'username accepted';
        });
    }
    if(isEmpty(data.password) || validator.isEmpty(data.password))
    {
        errors.password = 'password required';
    }
    else if(!validator.isLength(data.password,{min:6,max:30}))
    {
        errors.password = 'password must be between 6 and 30 characters long';
    }
    if(isEmpty(data.firstname) || validator.isEmpty(data.firstname))
    {
        errors.firstname = 'firstname is required';
    }
    if(isEmpty(data.lastname) || validator.isEmpty(data.lastname))
    {
        errors.lastname = 'lastname is required';
    }
    if(isEmpty(data.email) || validator.isEmpty(data.email))
    {
        errors.email = 'email is required';
    }
    else if(!validator.isEmail(data.email))
    {
        errors.email = "email is invalid";
    }
    else
    {
        await user.find({email: data.email}, 'email', async function(err,users)
        {
            if(err)
                errors.email = 'failed to verify email availabilty';
            else if(users.length > 0)
                errors.email = 'email accepted';
        });
    }
    return {errors, isValid: isEmpty(errors)};
};

router.post('/api/register', async function(req,res,next)
{
    console.log('Express: POST /api/register');

    const validation = await validateInput(req.body);

    if(validation.isValid == true)
    {
        const newUser = new user({
            username : req.body.username,
            password : req.body.password,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email
        });

        user.create(newUser,function(err,user)
        {
            if(err)
            {
                console.log(err);
                res.status(500).json({success: false, errors : 'failed to register user'});
            }
            else
            {
                res.status(200).json({success: true});
            }
        });
    }
    else
    {
        res.status(400).json({success: false, errors: validation.errors});
    }
});

module.exports = router;