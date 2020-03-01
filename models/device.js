const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
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
            required: false,
            default: ''
        },

        // TODO: better type for date: int array?
        // maybe have this required, but is assigned with like.. now()?
        installDate: {
            type: String,
            required: false,
            default: ''
        }
    }
);


module.exports = Device = mongoose.model('device', deviceSchema);

