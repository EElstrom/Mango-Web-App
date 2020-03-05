const mongoose = require('mongoose');
//100 degrees Fahrenheit
var maxTemp = [100, 'The value of path `{PATH}` ({VALUE}) is above the limit ({MAX}).'];
var minTemp = [0, 'The value of path `{PATH}` ({VALUE}) is below the limit ({MIN}).'];

//there are only 24 hours in a day
var maxLight = [24, 'The value of path `{PATH}` ({VALUE}) is above the limit ({MAX}).'];
var minLight = [0, 'The value of path `{PATH}` ({VALUE}) is below the limit ({MIN}).'];

//the highest pH level is 14 for soil
var maxPh = [14, 'The value of path `{PATH}` ({VALUE}) is above the limit ({MAX}).'];
var minPh = [1, 'The value of path `{PATH}` ({VALUE}) is below the limit ({MIN}).'];

//minHumidity to maxHumidity is 0% to 100%
var maxHumidity = [100, 'The value of path `{PATH}` ({VALUE}) is above the limit ({MAX}).'];
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
            max:schema.temperatureTolerance.maxTemp,
            min:schema.temperatureTolerance.minTemp,
            required: false,
            default: ''
        },

        // TODO: same as tempTol
        lightTolerance: {
            max: schema.lightTolerance.maxLight,
            min: shcema.lightTolerance.minLight,
            required: false,
            default: ''
        },

        // TODO: same as tempTol
        phTolerance: {
            max: schema.phTolerance.maxPh,
            min: schema.phTolerance.minPh,
            required: false,
            default: ''
        },

        // TODO: same as tempTol
        humidityTolerance: {
            max: schema.humidityTolerance.maxHumidity,
            min: schema.humidityTolerance.minHumidity,
            required: false,
            default: ''
        }
    }
);

module.exports = Plant = mongoose.model('plant', plantSchema);
