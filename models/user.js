const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        // PK for this table, FK for others
        userId:
        {
            type: String,
            required: false,
            default: ''
        },

        username: {
            type: String, 
            required: true
        },

        password: {
            type: String,
            required: true
        },

        firstname: {
            type: String, 
            required: true
        },

        lastname: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },
        
        location: {
            type: String,
            required: false,
            default: ''
        },

        noOfDevices: {
            type: Number,
            required: false,
            default: 0
        }
    }
);

module.exports = User = mongoose.models('user', userSchema);