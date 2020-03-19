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
            required: false,
            default: ''
        },

        date:
        {
            type: [Number],
            required: true
        },

        time:
        {
            type: [Number],
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
        }
    }
);

module.exports = Conditions = mongoose.model('conditions', conditionsSchema);