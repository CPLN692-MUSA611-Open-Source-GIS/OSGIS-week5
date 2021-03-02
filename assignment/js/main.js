/* =====================
  Copied from Week4 Lab 2, part 2 - application state => task 1
===================== */

// Use the data source URL from lab 1 in this 'ajax' function:
// Write a function to prepare your data (clean it up, organize it
// as you like, create fields, etc)
var parseData = function(dat) {
  x = JSON.parse(dat); 
  return x };

// Write a function to use your parsed data to create a bunch of
// marker objects (don't plot them!)


// Now we need a function that takes this collection of markers
// and puts them on the map
var plotMarkers = function(dat) {
  dat.map(a => a.addTo(map))
};

// At this point you should see a bunch of markers on your map if
// things went well.
// Don't continue on until you can make them appear!

/* =====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are (nearly) immediately removed from the map.

  In Leaflet, the syntax for removing one specific marker looks like this:

  map.removeLayer(marker);

  In real applications, this will typically happen in response to changes to the
  user's input.
===================== */

// Look to the bottom of this file and try to reason about what this
// function should look like
var removeMarkers = function(dat) {
  dat.map(a => map.removeLayer(a))
};

/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Filter down data to only include those general crime category is Narcotic / Drug Law Violations.

  Note: You can add or remove from the code at the bottom of this file
  for the stretch goal.
===================== */

var filterData = function(dat) {
  new_data =  _.filter(dat, function(num){ return num["General Crime Category"] == "Narcotic / Drug Law Violations";});
  return new_data
}

/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */
// var markers = []
$(document).ready(function() {
  $('#my-button').click(function(e) {
    // Define variables from user input
    url_text = $('#text-input1').val();
    console.log("url:", url_text);

    lat_key_text = $('#text-input2').val();
    console.log("lat_key_text:", lat_key_text);

    lng_key_text = $('#text-input3').val();
    console.log("lng_key_text:", lng_key_text);

    // Prepare for execution
    var downloadData = $.ajax(url_text);
    var makeMarkers = function(dat) {
      result = [];
      // x = dat.map(a => result.push(L.marker({"lat": a["Lat"], "lng": a["Lng"]})))
      x = dat.map( a => result.push(L.marker([a[lat_key_text], a[lng_key_text]])))
      return result };

    // Function execution
    downloadData.done(function(data) {
      var parsed = parseData(data);
      // removeMarkers(markers)
      _.tail(Object.values(map._layers)).forEach(a => map.removeLayer(a))
      markers = makeMarkers(parsed);
      plotMarkers(markers);
    });
  })
})