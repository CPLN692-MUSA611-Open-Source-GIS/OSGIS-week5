/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

// Write a function to prepare your data (clean it up, organize it
// as you like, create fields, etc)
var parseData = function(data) {
  let parsed = JSON.parse(data);
  console.log(`Data Loaded Successfully.`);
  console.log(parsed);

  // filteredData = [];
  // filteredOut = [];

  // // Add a new field to the parsed data: KWHigherThan5 to filter out those solar energy facilities lower than 5 KW
  // parsed.forEach(function(data){
  //   if (data.KW >= 5){
  //     data["KWHigherThan5"] = true;
  //     filteredData.push(data);
  //   } else {
  //     data["KWHigherThan5"] = false;
  //     filteredOut.push(data);
  //   }
  // });

  // Refactor data filter with underscore _.filter function
  filteredData = _.filter(parsed, function(entry){
    return entry.KW >= 5;
  })

  console.log(`Included: ${filteredData.length} Installations`);
  // console.log(`Excluded: ${filteredOut.length} Installations`);
  return filteredData;
};


// Write a function to use your parsed data to create a bunch of
// marker objects (don't plot them!)
var makeMarkers = function(data, latKey, lngKey) {
  markers = [];
  data.forEach(function(entry){
    markers.push(L.marker([entry[latKey], entry[lngKey]]).bindPopup(`${entry.NAME} <br><br> Developed By: ${entry.DEVELOPER}`));
  });
  return markers;
};

// Now we need a function that takes this collection of markers
// and puts them on the map
var plotMarkers = function(markerCollection) {
  markerCollection.forEach(function(markerEntry){markerEntry.addTo(map)});
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
var removeMarkers = function(markerCollection) {
  markerCollection.forEach(function(markerEntry){map.removeLayer(markerEntry)});
};

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

$("button").click(function(){

    var url =  $('input#text-input-url').val();
    var latKey = $('input#text-key-lat').val();
    var lngKey = $('input#text-key-lng').val();

    var downloadData = $.ajax(url);

    downloadData.done(function(data) {
      var parsed = parseData(data);
      // console.log(parsed)
      var markers = makeMarkers(parsed, latKey, lngKey);
      console.log(markers)
      plotMarkers(markers);
      removeMarkers(markers);
    });
});