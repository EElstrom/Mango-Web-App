const mongoose = require('mongoose');

const conditionsSchema = new mongoose.Schema(
    {
        deviceID: 
        {
            type: Int16Array,
            required: true
        },

        deviceName:
        {
            type: String,
            required: true
        },

        curTemp: 
        {
            type: Int16Array,
            required: true
        },

        curHumidity:
        {
            type: Int16Array,
            required: true
        },

        // I don't actually know what all parameters we're testing
        // TODO: finish all conditions recorded

        // are we keeping only daily ranges, multiple ranges?
        // temporary guesses
        rangeTemp: 
        {
            type: [Int16Array],
            required: true
        }, 

        rangeHumidity:
        {
            type: [Int16Array],
            required: true
        }
    }
);

module.exports = Conditions = mongoose.model('conditions', conditionsSchema);