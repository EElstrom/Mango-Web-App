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
