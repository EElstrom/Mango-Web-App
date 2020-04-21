const mongoose = require('mongoose');

const conditionsSchema = new mongoose.Schema(
    {
        // FK: extracted from userID, to then DeviceID
        deviceID: 
        {
            type: String,
            required: true
        },
      
        deviceName:
        {
            type: String,
            required: false,
            default: ''
        },

        // searchable and readable 
        // MM/DD/YYYY HH:MM [A][P]M
        datetime:
        {
            type: String,
            required: true
        },

        // 24hr format for computation
        // HHMM, must be in string to account for leading zeros. Ex: 0002 = 12:02AM
        time:
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

        airQuality:
        {
            type: String,
            required: true
        }
    }
);

module.exports = Conditions = mongoose.model('conditions', conditionsSchema);