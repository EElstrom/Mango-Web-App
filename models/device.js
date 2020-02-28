
const mongoose = require('mongoose');

const sensor = new mongoose.Schema(
    {
        // deviceId: 
        // {
        //     type: String,
        //     required: true
        // },
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