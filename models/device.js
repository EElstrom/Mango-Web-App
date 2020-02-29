
const mongoose = require('mongoose');

const sensor = new mongoose.Schema(
    {
        // FK: must be extracted from user
        userID:
        {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        installDate: {
            type: String,
            required: false
        }

    }
);

module.exports = Device = mongoos.model('device',deviceSchema);