const mongoose = require('mongoose');


const climateSchema = new mongoose.Schema(
    {
        // FK from sensor
        deviceID: 
        {
            type: String,
            required: true
        },

        // "MMDDYYYY" format
        date:
        {
            type: String,
            required: true
        },

        loTemp:
        {
            type: Number,
            required: true
        },
        
        loTempTime:
        {
            type: String,
            required: true
        },

        hiTemp:
        {
            type: Number,
            required: true
        },
        
        hiTempTime:
        {
            type: String,
            required: true
        },

        avgTemp:
        {
            type: Number,
            required: true
        },
        
        loHumidity:
        {
            type: Number,
            required: true
        },
        
        loHumTime:
        {
            type: String,
            required: true
        },

        hiHumidity:
        {
            type: Number,
            required: true
        },
        
        hiHumTime:
        {
            type: String,
            required: true
        },

        avgHumidity:
        {
            type: Number,
            required: true
        }
    }
);

module.exports = Climate = mongoose.model('climate', climateSchema);