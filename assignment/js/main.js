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

var userInput = $('button').click(function() {
    var url = $('#url-input').val();
    console.log("URL: ", $('#url-input').val());

    var lat = $('#lat-field-input').val();
    console.log("Latitude Field: ", lat);

    var lon = $('#lon-field-input').val();
    console.log("Longitude Field:", lon);

    var downloadData = $.ajax(url);

    var parseData = function(rawdata) {
        return JSON.parse(rawdata)
    };

    var makeMarkers = function(data) {
        var markers = data.map(function(addmarkers) { return L.marker([addmarkers[lat], addmarkers[lon]]) })
        return markers
    }

    var plotMarkers = function(markers) {
        markers.forEach(function(marker) { marker.addTo(map) })
    }

    downloadData.done(function(data) {
        var parsed = parseData(data);
        var markers = makeMarkers(parsed);
        plotMarkers(markers);
    });
});