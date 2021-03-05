/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */


// Write a function to prepare your data (clean it up, organize it
// as you like, create fields, etc)
var parseData = function(data) {
    return JSON.parse(data)
};




// Write a function to use your parsed data to create a bunch of
// marker objects (don't plot them!)
var makeMarkers = function(objs, lat, lon) {
  return objs.map(x => L.marker([x[lat], x[lon]]));
};


  

// Now we need a function that takes this collection of markers
// and puts them on the map
var plotMarkers = function(data) {
  _.each(data,function(entries){
    entries.addTo(map)
  })  
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
var removeMarkers = function(data) {
  _.each(data,function(entries){
    map.removeLayer(entries)
  })
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

$('#text-input1').prop('disabled',false);
$('#text-input2').prop('disabled',false);
$('#text-input3').prop('disabled',false);


  $('button').click(function(){
      var output = {
          URL: $('#text-input1').val(),
          LATKey: $('#text-input2').val(),
          LONKey: $('#text-input3').val()
  }
      console.log(output);
      $.ajax(output.url).done(function(data) {
        var parsedData = parseData(data);
        console.log(parsedData)
        var markers = makeMarkers(parsedData, output.LATKey, output.LONKey);
        console.log(markers)
        plotMarkers(markers);
      })
      
})



