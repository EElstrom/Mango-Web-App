const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema(
    {
        // FK: extracted from user
        userID:
        {
            type: String,
            required: true
        },
        name: {
            type: String, 
            required: true
        },

        ///created an alias for nickname
        alias: {
            type: String,
            required: false,
            default: ''
        },

        // for bookkeeping on multiple devices
        // if done WIKI style, this should not be included
        deviceName: {
            type: String,
            required: true
        },

        type: {
            type: String, 
            required: false,
            default: ''
        },

        // TODO: find better type to fit an int range - array?
        temperatureTolerance: {
            type: String,
            required: false,
            default: ''
        },

        // TODO: same as tempTol
        lightTolerance: {
            type: String, 
            required: false,
            default: ''
        },

        // TODO: same as tempTol
        phTolerance: {
            type: String,
            required: false,
            default: ''
        },

        // TODO: same as tempTol
        humidityTolerance: {
            type: String,
            required: false,
            default: ''
        }
    }
);

module.exports = Plant = mongoose.model('plant', plantSchema);
