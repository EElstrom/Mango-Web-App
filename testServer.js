const express = require('express');
const mongoose = require('mongoose');
const mongoClient = require('mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const keys = require('./config/keys');
app.use(bodyParser.json());
app.use(cookieParser());

// establish port; in development: localhost:5000
const port = process.env.PORT || 3000;

// route specifications
// const addDevice = require('./api/addDevice');
// const addPlant = require('./api/addPlant');
// const deleteDevice = require('./api/deleteDevice');
// const deletePlant = require('./api/deletePlant');
// const editDevice = require('./api/editDevice');
// const editPlant = require('./api/editPlant');
// const editUser = require('./api/editUser');
const login = require('./api/login');
// const logout = require('./api/logout');
// const register = require('./api/register');
// const getConditions = require('./api/getConditions');
// const searchPlants = require('./api/searchPlants');

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
app.use(testServer);

// Tested Routes Complete: 0



// Routes in Testing: 12
// using routes
// app.use(addDevice);
// app.use(addPlant);
// app.use(deleteDevice);
// app.use(deletePlant);
// app.use(editDevice);
// app.use(editPlant);
// app.use(editUser);
// app.use(getConditions);
app.use(login);
// app.use(logout);
// app.use(register);
// app.use(searchPlants);


app.listen(port, () => {
    console.log("Living it up in " + port + " city!");
});
