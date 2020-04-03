// this endpoint is designed to be called by the sensor or some independent party every 12hours
// or rather, whenever a timelapse period is complete

// prune will:
    // a) find() with empty query and deviceID
            // a.1) take first object and grab date 
    // b) loop through returned objects and parse data
        // 0) const item = JSON.parse(JSON.stringify(arr[i]));
        // 1) find hiTemp, loTemp, hiHum, loHum by comparison in 0(n)
        // 2) record times these values were confirmed at
            // 2.a) hiTempTime = item.datetime.substring(11, length(item.datetime) - 11);
            // 2.b) or hiTempTime = item.time for graphical reasons
            // musings-- schema can be updated: hiTempTime : {time12 : String, time24 : Number}
        // 3) sum all temps, sum all humidities
        // 4) store all times in a separate ARRAY "times[]" (for matching deletions later)
    // c) take data points that loop parsed and create:
        // 1) avg Temp, avg Hum
    // d) const newClimate = new Climate({ });
    // e) Climate.create(newClimate, (err, result) => {});
    // f) Remove all parsed entries from the conditions database associated with that device
        // a) Conditions.deleteMany({deviceID = req.body.id, time : {'$in' : times}}, ..);


// this endpoint covers CRUD : create for climate collection
// and CRUD : delete for conditions collection
// there won't be any update for either, once they're set, they're set.


// possibly a second prune for very old climate entries, that would need to be used by yet another third party
