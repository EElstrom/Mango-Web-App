// Pull all data pertaining to a particular device from DB
// return as an array of data? A JSON?
// Do we need a model for that data?

// a sensor.find() would return a query for that sensor, then:
// ping the table matching that deviceID and then parse that query

// how is the range data being stored?


// first: query DB for device matching name
    // NOTE: names must be required to be different then!

// second: take query, pull ID from it
    // save in a variable, like dID;
// third: query DB secondary table FK = dID
    // GET req dID, res JSON
// fourth: parse data - NEEDS MODEL CONFIRMED
    // conditions model made
    //--------------------------------------------
    /*
    const Conditions = require('../models/conditions);
    currConditions = new Conditions({
        deviceID: res.deviceID,
        deviceName: res.deviceName,
        curTemp: res.CurTemp,
        curHumidity: res.curHumidity,
        rangeTemp: res.rangeTemp,
        rangeHumidity: res.rangeHumidity
    });
    */
   //---------------------------------------------

// of course, error checking throughout
// now all the data is saved in a JSON following the model
// now the question is, how do I get that back to the pages, and have them display it?