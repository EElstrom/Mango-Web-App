const mongoose = require('mongoose');

const conditionsSchema = new mongoose.Schema(
    {
        // FK: extracted from userID, to then DeviceID
        deviceID: 
        {
            type: Number,
            required: true
        },
        
        deviceName:
        {
            type: String,
            required: true
        },

        curTemp: 
        {
            type: Number,
            required: true
        },

        curHumidity:
        {
            type: Number,
            required: true
        },

        // I don't actually know what all parameters we're testing
        // TODO: finish all conditions recorded

        // are we keeping only daily ranges, multiple ranges?
        // temporary guesses
        rangeTemp: 
        {
            type: [Number],
            required: true
        }, 

        rangeHumidity:
        {
            type: [Number],
            required: true
        }
    }
);

module.exports = Conditions = mongoose.model('conditions', conditionsSchema);