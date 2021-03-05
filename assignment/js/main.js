/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

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




// Write a function to prepare your data (clean it up, organize it
// as you like, create fields, etc)
var parseData = function(data) {
  res =JSON.parse(data)
  //print out selected data
  console.log(res)
  return res
};



// Write a function to use your parsed data to create a bunch of
// marker objects (don't plot them!)
var makeMarkers = function(data, LAT, LNG) {
  return _.map(data, (i) => {
    return L.marker([i[LAT], i[LNG]])
  })
};

// Now we need a function that takes this collection of markers
// and puts them on the map
var plotMarkers = function(markers) {
  return markers.forEach(i => i.addTo(map))
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
var removeMarkers = function(markers) {
  return markers.forEach(i => map.removeLayer(i))
};




/* =====================
 CODE EXECUTED HERE!
===================== */



var getInput = () => {
    var input = {}
    input.url = $("input#data-url").val()
    input.latKey = $("input#lat").val()
    input.longKey = $("input#long").val()

    //set default value
    if (input.url == "") {input.url="https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/philadelphia-crime-snippet.json"}
    if (input.latKey == "") {input.latKey = "Lat"}
    if (input.longKey == "") {input.longKey = "Lng"}

    return input 
}



$(document).ready(function() {
    $( "button" ).click(function() {
        var userInput = getInput()
        var downloadData = $.ajax(userInput.url)
        downloadData.done(function(data) {
            var parsed = parseData(data);
            var markers = makeMarkers(parsed, userInput.latKey, userInput.longKey);
            plotMarkers(markers);
        });   
    });
});
