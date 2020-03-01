const express = require('express');
const mongoose = require('mongoose');
const mongoClient = require('mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// establish port; in development: localhost:5000
const port = process.env.PORT || 5000;

// route specifications
const login = require('./api/login');
const register = require('./api/register');
const logout = require('./api/logout');
const editUser = require('./api/editUser');
const addSensor = require('./api/addDevice');
const deleteSensor = require('./api/deleteDevice');
const editSensor = require('./api/editDevice');
const getConditions = require('./api/getConditions');
const addPlant = require('./api/addPlant');
const deletePlant = require('./api/deletePlant');
const editPlant = require('./api/editPlant');
const searchPlants = require('./api/searchPlants');

// Set some HTTP Request Headers (I don't know why)
app.use((req, res, next) => 
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});

// Frontend Routes -> If someone pings the express server looking
//                    for the frontend pages, this will forward
//                    the frontend pages to the requester
app.use(express.static('./build'));
app.get('*', function(req, res)
{
	res.sendFile('./build/index.html', {root: __dirname});
});

// testing module for basic get/post/del
const servertesting = require('./api/servertesting');
app.use(servertesting);

// routes implemented: UNTESTED
app.use(addPlant);

// routes impelemented: TESTED

// ROUTES NOT CURRENTLY SETUP - will crash server until they're ready
// app.use() needs to be caught by router.___() in routes
/*
// using routes
app.use(login);
app.use(register);
app.use(logout);
app.use(editUser);
app.use(addDevice);
app.use(deleteDevice);
app.use(editDevice);
app.use(getConditions);
app.use(deletePlant);
app.use(editPlant);
app.use(searchPlants);
*/

app.listen(port, () => {
    console.log("Living it up in " + port + " city!");
});
