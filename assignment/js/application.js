/* =====================
Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
will be called as soon as the application starts. Be sure to parse your data once you've pulled
it down!
===================== */
var getAndParseData = function(result) {
    // Filter, clean, and store data
    let parsed = JSON.parse(result);


    // Cast lat and lng to numbers
    parsed = parsed.map((loc) => {
        try{  
            [appState.latKey, appState.lngKey].forEach((key) => {
                if (!(key in loc)) {
                    console.log(`Cannot find ${key} in ${loc}!`)
                } else {
                    loc[key] = Number(loc[key])
                }                          
            })          
        } catch (err) {console.log(err)}
        return loc
    })
    
    // Filter out invalid location
    let valid = _.filter(parsed, (loc) => {
        return -90 <= loc[appState.latKey] && loc[appState.latKey] <= 90 &&
        -180 <= loc[appState.lngKey] && loc[appState.lngKey] <= 180
    })
    
    if (valid.length > 0) {
        appState.data = valid;
    } else {
        alert("Invalid latitude and longitude data!");
    }        
};  

/* =====================
  Define a resetMap function to remove markers from the map and clear the array of markers
===================== */
var resetMap = function() {
    /* =====================
      Fill out this function definition
    ===================== */
    if (appState.markers.length > 0) {
        appState.markers.forEach(mark => map.removeLayer(mark))
        appState.markers = []
    }
};  


  
/* =====================
Call our plotData function. It should plot all the markers that meet our criteria (whatever that
criteria happens to be — that's entirely up to you)
===================== */
var plotData = function() {
    /* =====================
        Fill out this function definition
    ===================== */
    appState.markers = _.map(appState.data, (loc) => L.marker([loc[appState.latKey], loc[appState.lngKey]]))
    appState.markers.forEach((mark) => mark.addTo(map))
};