<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const validator = require('valildator');
const isEmpty = require('is-empty');

//const jwt = require('jsonwebtoken');
//const keys = reqire('../config/keys');

const plant = require('../models/plant');

function validateInput(data)
{
    var errors = {};
    var fieldCount = 0;

    if(!isEmpty(data.name)&& !validator.isEmpty(data.plantName))
        fieldCount++;
    if(!isEmpty(data.alias)&& !validator.isEmpty(data.plantAlias))
        fieldCount++;
    if(!isEmpty(data.deviceName) && !validator.isEmpty(data.deviceName))
        fieldCount++;
    if(!isEmpty(data.type)&& !validator.isEmpty(data.type))
        fieldCount++;
    if(!isEmpty(data.temperatureTolerance) && !validator.isEmpty(data.temperatureTolerance))
        fieldCount++;
    if(!isEmpty(data.lightTolerance) && !validator.isEmpty(data.lightTolerance))
        fieldCount++;
    if(!isEmpty(data.phTolerance) && !validator.isEmpty(data.phTolerance))
        fieldCount++;
    if(!isEmpty(data.humidityTolerance) && !validator.isEmpty(humidityTolerance))
        fieldCount++;
    if(fieldCount< 1)
        errors.fieldCount = 'request must include at least one plant detail';
    
    return{erros, isValid: isEmpty(errors)};
};

router.post('/api/addPlant',function(req,res,next)
{
    console.log('Express: POST /api/addPlant');

    ///const authToken = req.cookies.session;
    ///jwt.verify(authToken, keys.secretOrKey, function(err,plant))
    ///{
        ///if(err || !plant)
        ///{
            ///res.status(401).jason({success: false, errors: 'access denied: please login'});
        ///}
        ///else
        ///{
            const validation = validateInput(req.body);
            if(validation.isValid)
            {
                const newPlant = newPlant
                ({
                    plantId : plant.id,
                    name : req.body.plantName,
                    alias : req.body.plantAlias,
                    deviceName : req.body.deviceName,
                    type : req.body.type,
                    temperatureTolerance : req.body.temperatureTolerance,
                    lightTolerance : req.body.lightTolerance,
                    phTolerance : req.body.phTolerance,
                    humidityTolerance : req.body.humidityTolerance
                });
                plant.create(newPlant, function(err,plant)
                {
                    if(err)
                    {
                        console.log(err);
                        res.status(500).json({success: false, errors: 'failed to register plant'});
                    }
                    else
                    {
                        res.status(200).json({success:true});
                    }
                });///end plant.create(newPlant)

            }///end if statement
            else
            {
                res.stutus(400).json({success: false, errors: validation.errors});
            }
        ///}end first else statement
    ///}); end jwt.verify(authToken,keys.secretOrKey, function(err,user))
});///end router.post function

module.exports = router;
=======

>>>>>>> 54cb494e86fa21073c49eb95762fadf20ec08855
