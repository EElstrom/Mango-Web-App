const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// These make request bodies and cookies easier to read
app.use(bodyParser.json());
app.use(cookieParser());

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
app.use(express.static('./frontend/build'));
app.get('*', function(req, res)
{
	res.sendFile('./frontend/build/index.html', {root: __dirname});
});

// Start the server listening on port 5000
var port = process.env.PORT || 5000;

app.listen(port, () => console.log('Express: Server Started'));
