const express = require('express');
const mongoose = require('mongoose');
const mongoClient = require('mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const keys = require('./config/keys');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
const verify = require('./api/verify');
const addDevice = require('./api/addDevice');
const deleteDevice = require('./api/deleteDevice');
const getDevices = require('./api/getDevices');
const editDevice = require('./api/editDevice');
const getClimates = require('./api/getClimates');
const getConditions = require('./api/getConditions');
const addPlant = require('./api/addPlant');
const deletePlant = require('./api/deletePlant');
const editPlant = require('./api/editPlant');
const getPlants = require('./api/getPlants');
const deviceLogin = require('./api/deviceLogin');
const logCondition = require('./api/logCondition');
const logConditionStupid = require('./api/logConditionStupid');
const deleteUser = require('./api/deleteUser');

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
app.use(verify);
app.use(deleteUser);

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

// storing data:
app.use(deviceLogin);
app.use(logCondition);
app.use(logConditionStupid);

// retrieving data
app.use(getClimates);
app.use(getConditions);


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

const datetime = makeDateTime();

app.listen(port, () => {
	console.log("Living it up in " + port + " city!");
	console.log(datetime.day);
	console.log(datetime.time);
	console.log(datetime.time24);
});
