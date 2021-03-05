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

var parseData = function(data) {return JSON.parse(data)};

var makeMarkers = function(objs, lat, lon) {
  return objs.map(x => L.marker([x[lat], x[lon]]));
};

var plotMarkers = function(markers) {
  markers.forEach(marker=>marker.addTo(map))};

$(document).ready(function() {
  var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  var userinput = $( "button" ).click(function() {
    if ($('#text-input1').val() == "some title"){
      $('#text-input1').val("https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-bike-crashes-snippet.json");
    }
    if ($('#text-input2').val() == "some name"){
      $('#text-input2').val("lat_final");
    }
    if ($('#text-input3').val() == "some address"){
      $('#text-input3').val("long_final");
    }
    var entry = {
      url: $('#text-input1').val(),
      lat: $('#text-input2').val(),
      lon: $('#text-input3').val(),
    }
    $.ajax(entry.url).done(function(data) {
      var parsed = parseData(data);
      console.log(parsed)
      var markers = makeMarkers(parsed, entry.lat, entry.lon);
      console.log(markers)
      plotMarkers(markers);
    });
});
});

/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
