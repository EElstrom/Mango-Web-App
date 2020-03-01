const mongoose = require('mongoose');
var maxTemp = [1, 'The value of path `{PATH}` ({VALUE}) is beyond the limit ({MAX}).'];
var minTemp = [0, 'The value of path `{PATH}` ({VALUE}) is below the limit ({MIN}).'];

var maxLight = [1, 'The value of path `{PATH}` ({VALUE}) is beyond the limit ({MAX}).'];
var minLight = [0, 'The value of path `{PATH}` ({VALUE}) is below the limit ({MIN}).'];

var maxPh = [1, 'The value of path `{PATH}` ({VALUE}) is beyond the limit ({MAX}).'];
var minPh = [0, 'The value of path `{PATH}` ({VALUE}) is below the limit ({MIN}).'];

var maxHumidity = [1, 'The value of path `{PATH}` ({VALUE}) is beyond the limit ({MAX}).'];
var minHumidity = [0, 'The value of path `{PATH}` ({VALUE}) is below the limit ({MIN}).'];
const plantSchema = new mongoose.Schema(
    {

        // FK: extracted from user
        userID:
        {
            type: String,
            required: true
        },
        name: {
            type: String, 
            required: true
        },

        ///created an alias for nickname
        alias: {
            type: String,
            required: false,
            default: ''
        },

        // for bookkeeping on multiple devices
        // if done WIKI style, this should not be included
        deviceName: {
            type: String,
            required: true
        },

        type: {
            type: String, 
            required: false,
            default: ''
        },

        // TODO: find better type to fit an int range - array?
        temperatureTolerance: {
            max:maxTemp,
            min:minTemp,
            required: false,
            default: ''
        },

        // TODO: same as tempTol
        lightTolerance: {
            max: maxLight,
            min: minLight,
            required: false,
            default: ''
        },

        // TODO: same as tempTol
        phTolerance: {
            max: maxPh,
            min: minPh,
            required: false,
            default: ''
        },

        // TODO: same as tempTol
        humidityTolerance: {
            max: maxHumidity,
            min: minHumidity,
            required: false,
            default: ''
        }
    }
);

module.exports = Plant = mongoose.model('plant', plantSchema);
