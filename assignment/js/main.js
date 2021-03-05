/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
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

var userInput =  $('button').click( function () {
    var url = $('#text-input1').val();
    console.log("URL: ", $('#text-input1').val());

    var lat = $('#text-input2').val();
    console.log("Latitude Key: ", lat);

    var long = $('#text-input3').val();
    console.log("Longitude Key:", long);

    var downloadData = $.ajax(url);

   
var parseData = function(rawdata) {
    return JSON.parse(rawdata)
  };

var makeMarkers = function(data) { 
  var markers = data.map(function(addmarkers) {return L.marker([addmarkers[lat],addmarkers[long]])})
  return markers }

var plotMarkers = function(markers) {
  markers.forEach(function(marker){marker.addTo(map)})}


// /* =====================
//   Define the function removeData so that it clears the markers you've written
//   from the map. You'll know you've succeeded when the markers that were
//   previously displayed are (nearly) immediately removed from the map.

//   In Leaflet, the syntax for removing one specific marker looks like this:

//   map.removeLayer(marker);

//   In real applications, this will typically happen in response to changes to the
//   user's input.
// ===================== */

// // Look to the bottom of this file and try to reason about what this
// // function should look like

// var removeMarkers = function(markers) {
//   markers.forEach(function(marker){
//     map.removeLayer(marker)
//   })
// };

/* =====================
 Leaflet setup - feel free to ignore this
===================== */



/* =====================
 CODE EXECUTED HERE!
===================== */

downloadData.done(function(data) {
   var parsed = parseData(data);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
//   removeMarkers(markers);
});
});
