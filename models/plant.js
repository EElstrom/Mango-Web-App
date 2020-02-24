const mongoose = require('mongoose');

const plant = new mongoose.Schema(
    {
        plantId:
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
            required: false
        },
        deviceName: {
            type: String,
            required: true
        },
        type: {
            type: String, 
            required: false
        },

        temperatureTolerance: {
            type: String,
            required: false
        },

        lightTolerance: {
            type: String, 
            required: false
        },

        phTolerance: {
            type: String,
            required: false
        },

        humidityTolerance: {
            type: String,
            required: false
        }

    }
);