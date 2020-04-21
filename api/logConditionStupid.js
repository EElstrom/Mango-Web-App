// necessary endpoint to add a condition to the collection
// should be called by the sensor at given intervals (based on postfrequency for that sensor)
// ultimately a straight-forward endpoint
// all info should be provided by sensor
// can probably get date/time on this side
// mind schema change: datetime is human eye friendly, time is 24hr based number
// time is meant to be helpful for graphing
// unless timelapse traverses 2400, in which case parsing will need to be careful
const express = require('express');
const router = express.Router();
const validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');

const keys = require("../config/keys");
const Condition = require('../models/conditions');

// validate all required fields are present
// deviceID & devinceName from jwt 
async function validateInput(data)
{
    const errors = {};

    // id
    if (isEmpty(data.id) || validator.isEmpty(data.id))
    {
        errors.id = 'id required'
    }
    
    // curTemp
    if (!data.curTemp)
    {
        errors.curTemp = 'curTemp required'
    }

    // curHumidity
    if (!data.curHumidity)
    {
        errors.curHumidity = 'curHumidity required'
    }

    return {
        errors, 
        isValid: isEmpty(errors) 
    };
};

function makeDateTime() 
{
    today = new Date();
    month = today.getMonth() + 1;
    if (month < 10)
        month = '0' + month;
    day = (month + '/' + today.getDate() + '/' + today.getFullYear());

    hours = today.getHours();
    time24 = hours;
    if (time24 < 10)
    {
        time24 = '0' + time24;
    }
    meridian = 'AM';
    if (hours > 12)
    {
        hours -= 12;
        meridian = 'PM';
    }
        
    minutes = today.getMinutes();
    
    if (minutes < 10)
        minutes = '0' + minutes;

    time = hours + ':' + minutes + ' ' + meridian;
    time24 += '' + minutes;

    return {
        day,
        time,
        time24
    };
}

router.post('/api/logConditionStupid', async (req, res) => {
    console.log('POST in logConditionStupid');

    const authToken = req.cookies.session;
    
    const validation =  await validateInput(req.body);

    // create timestamp
    const now = makeDateTime();
    datetime = now.day + ' ' + now.time;
    console.log(datetime);
    time24 = now.time24;
    console.log(time24);    

    console.log("device is: %s", req.body.id);

    if (validation.isValid)
    {
        const newCondition = new Condition({
            deviceID : req.body.id,
            deviceName : "wHO kNowS",
            datetime : datetime,
            time : time24,
            curTemp : req.body.curTemp,
            curHumidity : req.body.curHumidity,
            airQuality: req.body.airQuality
        });

        // .create() to package and send to db
        Condition.create(newCondition, (err, result) => {
            if (err)
            {
                console.log(err);
                res
                    .status(500)
                    .json({
                        success: false,
                        errors: 'failed to add condition'
                    });
            }

            else
            {
                res
                    .status(200)
                    .json({success: true});
            }
        });
    }
    else
    {
        console.log(validation.errors);
        res
            .status(400)
            .json({
                success: false, 
                message: 'did not validate',
                errors: validation.errors
            });
    }
});
    
module.exports = router;
    
    