const mongoose = require('mongoose');

const climateSchema = new mongoose.Schema
({
    deviceID:
    {
        type : String,
        required: True
    },
    date:
    {
        
    },
    currTemp:
    {
        type: Integer,
        required : true
    }, 
    currHumidity:
    {
        type: Integer,
        required: true
    }
});