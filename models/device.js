<<<<<<< HEAD
const mongoose = require('mongoose');

const sensor = new mongoose.Schema(
    {
        deviceId: 
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
=======

>>>>>>> 54cb494e86fa21073c49eb95762fadf20ec08855
