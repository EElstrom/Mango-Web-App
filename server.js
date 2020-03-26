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
const getUser = require('./api/getUser');
const editUser = require('./api/editUser');
const addDevice = require('./api/addDevice');
const deleteDevice = require('./api/deleteDevice');
const getDevices = require('./api/getDevices');
const editDevice = require('./api/editDevice');
const getConditions = require('./api/getConditions');
const addPlant = require('./api/addPlant');
const deletePlant = require('./api/deletePlant');
const editPlant = require('./api/editPlant');
const getPlants = require('./api/getPlants');


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

// user routes:
app.use(register);
app.use(login);
app.use(logout);
app.use(getUser);
app.use(editUser)

// Device routes:
app.use(addDevice);
app.use(deleteDevice);
app.use(getDevices);
app.use(editDevice);

// plant routes:
app.use(addPlant);
app.use(deletePlant);
app.use(getPlants);
app.use(editPlant);

/*
// storing data:
app.use(getConditions)
app.use(getClimate)
app.use(storeConditions)
app.use(storeClimate)
*/

app.listen(port, () => {
    console.log("Living it up in " + port + " city!");
});
