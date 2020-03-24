const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('is-empty');

const keys = require('../config/keys');
const Plant = require('../models/plant');

// supports search
router.post('/api/getPlants', (req, res) => {
    console.log("POST in /api/getPlants");

    const authToken = req.cookies.session;

    jwt.verify(authToken, keys.secretOrKey, (err, user) => {
        if (err || !user)
        {
            res
                .status(401)
                .json({
                    success: false,
                    errors: "access denied, please log in"
                });
        }
        // POST {'query' : 'query'} or empty
        else
        {
		const query = (!isEmpty(req.body.query) ? req.body.query : '');
			            
            var request = {};

            request.userID = user.id;

            // search function for string conditionals
            if (query)
            {
                request = {
                    $or : [
                        {name : {$regex: '.*' + query + '.*', $options: 'i'}},
			{notes: {$regex: '.*' + query + '.*', $options: 'i'}},
			{deviceName: {$regex: '.*' + query + '.*', $options: 'i'}},
			{type: {$regex: '.*' + query + '.*', $options: 'i'}},
			{temperatureTolerance: {$regex: '.*' + query + '.*', $options: 'i'}},
			{lightTolerance: {$regex: '.*' + query + '.*', $options: 'i'}},
			{phTolerance: {$regex: '.*' + query + '.*', $options: 'i'}},
			{humidityTolerance: {$regex: '.*' + query + '.*', $options: 'i'}}
                    ]
                };
            }

            Plant
                .find(request, (err, arr) => {
                    // errors most likely due to regex issues
                    if (err)
                    {
                        console.log(err);
                        res
                            .status(500)
                            .json({
                                success: false,
                                errors: 'failed to search plants'
                            });
                    }
                    else
                    {
                        const plants = [];
                        for (i = 0; i < arr.length; i++)
                        {
                            const plant = JSON.parse(JSON.stringify(arr[i]));
                            delete plant.userID; // hide user._id
                            delete plant.__v;
                            plants.push(plant);
                        }
                        
                        res
                            .status(200)
                            .json({
                                success: true,
                                plants: plants
                            });
                    }
                })
                .sort({
                    name: 1
                });
        }
    });
});

module.exports = router;
