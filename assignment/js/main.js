/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

let appState = {
    "URL":undefined,    
    "data": undefined,
    "latKey": undefined,
    "lngKey": undefined,
    "markers": [L.marker([39.9522, -75.1639])]
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



$('button#plot_btn').click(function(e) {
    appState.URL = $('#url').val();
    console.log("URL", appState.URL);
  
    appState.latKey = $('#lat').val();
    console.log("Latitude key", appState.latKey);
  
    appState.lngKey = $('#lng').val();
    console.log("Longtitude key", appState.lngKey);

    $.ajax(appState.URL).done(result => {
        getAndParseData(result);

        resetMap();

        plotData();
    })
  });