const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema(
    {
        // FK: extracted from user
        userID:
        {
            type: String,
            required: true
        },

        name: 
        {
            type: String, 
            required: true
        },

        // for bookkeeping on multiple devices
        // if done WIKI style, this should not be included
        deviceName:
        {
            type: String,
            required: false,
            default: ''
        },

        type: 
        {
            type: String, 
            required: false,
            default: ''
        },

        tempTolerance: 
        {
            type: [Number],
            required: false,
            default: ''
        },

        // TODO: same as tempTol
        humidityTolerance: 
        {
            type: String,
            required: false,
            default: ''
        }
    }
);

module.exports = Plant = mongoose.model('plant', plantSchema);
