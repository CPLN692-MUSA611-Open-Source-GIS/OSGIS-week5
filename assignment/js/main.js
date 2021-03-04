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

$(document).ready(function() {
  var URL = $('#URL-input').val()
  var Lat_key = $('#Latkey-input').val()
  var Long_key = $('#Longkey-input').val()
  var downloadData = $.ajax(URL);
  
  var parseData = function(rawdata) {
    return JSON.parse(rawdata)
  };

  var makeMarkers = function(data) {
    result=[]
    data.forEach(add_new)
    function add_new(item) {
      result.push([item[Lat_key],item[Long_key]])
    }
    return result
  };

  myIcon = L.icon({
    iconUrl: 'icon.png',
    iconSize: [20,20 ]
  });
  var plotMarkers = function(markers) {
    _.each(markers, function(marker) { L.marker(marker,{icon: myIcon}).addTo(map) 
    })
  };

  var removeMarkers = function(markers) {
    _.each(markers, function(marker) { map.removeLayer(marker)
    })
  };
  
 function plot () {
    downloadData.done(function(data) {
    var parsed = parseData(data)
    var markers = makeMarkers(parsed);
    plotMarkers(markers);})
  }
  
  $('button').click(plot)

});

    // removeMarkers(markers);
