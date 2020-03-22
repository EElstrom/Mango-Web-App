const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('is-empty');
  
const keys = require('../config/keys');

const Plant = require('../models/plant');

function validateInput(data)
{
	var errors = {};
 
	return {errors, isValid: isEmpty(errors)};
};

router.post('/api/searchPlants', function(req, res, next)
{
	console.log('Express: POST /api/searchPlants');

	const authToken = req.cookies.session;

	jwt.verify(authToken, keys.secretOrKey, function(err, user)
	{
		if (err || !user)
		{
			res.status(401).json({success: false, errors: 'access denied: please login'});
		}
		else
		{
			const validation = validateInput(req.body);

			if (validation.isValid)
			{
				const query = (isEmpty(req.body.query)) ? "" : req.body.query;
				const name = (isEmpty(req.body.name)) ? "" : req.body.name;
				const alias = (isEmpty(req.body.alias)) ? "" : req.body.alias;
				const deviceName = (isEmpty(req.body.deviceName)) ? "" : req.body.deviceName;
				const type = (isEmpty(req.body.type)) ? "" : req.body.type;
				const temperatureTolerance = (isEmpty(req.body.temperatureTolerance)) ? "" : req.body.temperatureTolerance;
				const lightTolerance = (isEmpty(req.body.lightTolerance)) ? "" : req.body.lightTolerance;
                const phTolerance = (isEmpty(req.body.phTolerance)) ? "" : req.body.phTolerance;
                const humidityTolerance = (isEmpty(req.body.humidityTolerance)) ? "" : req.body.humidityTolerance;

				var request = {};

				if (query)
				{
					request = {
					  $or: [
					    {name: {$regex: '.*' + query + '.*', $options: 'i'}},
					    {alias: {$regex: '.*' + query + '.*', $options: 'i'}},
					    {deviceName: {$regex: '.*' + query + '.*', $options: 'i'}},
					    {type: {$regex: '.*' + query + '.*', $options: 'i'}},
					    {temperatureTolerance: {$regex: '.*' + query + '.*', $options: 'i'}},
					    {lightTolerance: {$regex: '.*' + query + '.*', $options: 'i'}},
                        {phTolerance: {$regex: '.*' + query + '.*', $options: 'i'}},
                        {humidityTolerance: {$regex: '.*' + query + '.*', $options: 'i'}}
					  ]
					};
				}
				else
				{
					if (name)
						request.firstname = {$regex: '.*' + firstname + '.*', $options: 'i'};
					if (alias)
						request.alias = {$regex: '.*' + alias + '.*', $options: 'i'};
					if (deviceName)
						request.deviceName = {$regex: '.*' + deviceName + '.*', $options: 'i'};
					if (type)
						request.type = {$regex: '.*' + type + '.*', $options: 'i'};
					if (temperatureTolerance)
                        request.temperatureTolerance = {$regex: '.*' + temperatureTolerance + '.*', $options: 'i'};
                    if (lightTolerance)
						request.lightTolerance = {$regex: '.*' + lightTolerance + '.*', $options: 'i'};
					if (phTolerance)
						request.phTolerance = {$regex: '.*' + phTolerance + '.*', $options: 'i'};
					if (humidityTolerance)
						request.humidityTolerance = {$regex: '.*' + humidityTolerance + '.*', $options: 'i'};
				}

				request.userId = user.id;
				Plant.find(request, function(err, arr)
				{
					if (err)
					{
						console.log(err);
						res.status(500).json({success: false, errors: 'failed to search plants'});
					}
					else
					{
						var plants = [];
						for (i = 0; i < arr.length; i++)
						{
							var plant = JSON.parse(JSON.stringify(arr[i]));
							delete plant.userId;
							delete plant.__v;
							plants.push(plant);
						}
						res.status(200).json({success: true, plants: plants});
					}
				}).sort((isEmpty(req.body.sort_by)) ? {name: 1} : req.body.sort_by);
			}
			else
			{
				res.status(400).json({success: false, errors: validation.errors})
			}
		}
	});
});

module.exports = router;