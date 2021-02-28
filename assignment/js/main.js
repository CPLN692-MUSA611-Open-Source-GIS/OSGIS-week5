/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 2
  });
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
 }).addTo(map);

//Read in data function
var input = [];
var readInput = function(){
    console.log($('#text-input1').val());
    console.log($('#text-input2').val());
    console.log($('#text-input3').val());
    var input = {"URL": $('#text-input1').val(),
                "Longitude": $('#text-input2').val(),
                "Latitude": $('#text-input3').val()
                };
    return input;
};


    //https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json
    //CapitalLatitude
    //CapitalLongitude

    // Write a function to prepare your data (clean it up, organize it
    // as you like, create fields, etc)
    var parseData = function(data) {
    data = JSON.parse(data);
    return data;
    };

    // Write a function to use your parsed data to create a bunch of
    // marker objects (don't plot them!)
    var makeMarkers = function(data) {
    return _.map(data,function(plotData){
        return L.marker([plotData[input.Latitude], plotData[input.Longitude]]);
    })
    };

    // Now we need a function that takes this collection of markers
    // and puts them on the map
    var plotMarkers = function(marker) {
    _.each(marker,function(marker){
        marker.addTo(map);
    })
    };


    var removeMarkers = function(marker) {
    _.each(marker,function(marker){
        map.removeLayer(marker);
    })
    console.log("yay");
    };

    /* =====================
    Leaflet setup - feel free to ignore this
    ===================== */


    /* =====================
    CODE EXECUTED HERE!
    ===================== */

    $(document).ready(function() {
        var markers = [];
        //When button is clicked 
        $('button').click(function(e){
            //Clear map
            removeMarkers(markers);
            //Read in data
            input = readInput();
            var downloadData = $.ajax(input.URL);
            downloadData.done(function(data) {
                parsed = parseData(data);
                console.log(parsed);
                markers = makeMarkers(parsed);
                plotMarkers(markers);
            });
        });
    });


