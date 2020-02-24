const mongoose = require('mongoose');

const userScheme = new mongoose.Schema(
{
    userId:
    {
        type: String,
        required: true
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
        required: false
    },

    noOfDevices: {
        type: Int16Array,
        required: false
    }
});