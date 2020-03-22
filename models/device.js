const mongoose = require('mongoose');
<<<<<<< Updated upstream
 
=======
  
>>>>>>> Stashed changes
const deviceSchema = new mongoose.Schema(
    {
        // FK: must be extracted from user
        userID:
        {
            type: String,
            required: true
        },
      
        alias: 
        {
            type: String,
            required: true
        },

        postFrequency:
        {
            type: Number,
            required: true
        },

        location: 
        {
            type: String,
            required: false,
            default: ''
        }
    }
);

module.exports = Device = mongoose.model('devices', deviceSchema);
