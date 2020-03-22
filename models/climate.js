const mongoose = require('mongoose');
<<<<<<< Updated upstream

 
=======
 

>>>>>>> Stashed changes
const climateSchema = new mongoose.Schema(
    {
        // FK from sensor
        deviceID: 
        {
            type: Number,
            required: true
        },

        date:
        {
            type: [Number],
            required: true
        },

        loTemp:
        {
            type: Number,
            required: true
        },
        
        loTempTime:
        {
            type: [Number],
            required: true
        },

        hiTemp:
        {
            type: Number,
            required: true
        },
        
        hiTempTime:
        {
            type: [Number],
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
            type: [Number],
            required: true
        },

        hiHumidity:
        {
            type: Number,
            required: true
        },
        
        hiHumTime:
        {
            type: [Number],
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