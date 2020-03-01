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

<<<<<<< HEAD
module.exports = Device = mongoos.model('device',deviceSchema);
=======
module.exports = Device = mongoose.model('device', deviceSchema);
>>>>>>> 8acbe7b289013b574d3f7754124490ee122d187a
