const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: 
        {
            type: String,
            required: true
        },

        password: 
        {
            type: String,
            required: true
        },

        authCode:
        {
            type: Number,
            require: true
        },

        verified:
        {
            type: Boolean,
            required: false,
            default: false
        },

        name: 
        {
            type: String,
            required: false,
            default: ''
        },
        
        location: 
        {
            type: String,
            required: false,
            default: ''
        },

        noOfDevices: 
        {
            type: Number,
            required: false,
            default: 0
        }
    }   
);

module.exports = User = mongoose.model('users', userSchema);
