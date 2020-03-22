const express = require('express');
const mongoose = require('mongoose');
const mongoClient = require('mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const keys = require('./config/keys');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// establish port; in development: localhost:5000
const port = process.env.PORT || 5000;


// connect MongoDB
mongoose
  .connect(keys.mongoURI, {
		useNewUrlParser: true, 
		useUnifiedTopology: true, 
		useFindAndModify: false
	 })
	.then(() => console.log('Express: Connected to MongoDB'))
	.catch((err) => console.error(err));


// route specifications
// device-related endpoints likely to change
const login = require('./api/login');
const register = require('./api/register');
const logout = require('./api/logout');
const editUser = require('./api/editUser');
const addDevice = require('./api/addDevice');
const deleteDevice = require('./api/deleteDevice');
const editDevice = require('./api/editDevice');
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
//const servertesting = require('./api/servertesting');
//app.use(servertesting);

// routes implemented: UNTESTED
app.use(addPlant);

// user routes:
app.use(register);
app.use(login);
app.use(logout);
// app.use(editUser)

// routes impelemented: TESTED

/*
// add routes:
app.use(addDevice);
app.use(addPlant);
// edit (user FK) routes:
app.use(editDevice);
app.use(editPlant);
// delete (user FK) routes:
app.use(deleteDevice);
app.use(deletePlant);
// misc routes:
app.use(searchPlants);
// storing data:
*/

app.listen(port, () => {
    console.log("Living it up in " + port + " city!");
});