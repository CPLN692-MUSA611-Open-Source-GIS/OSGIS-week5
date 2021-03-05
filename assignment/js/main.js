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

/* =====================
 CODE EXECUTED HERE!
===================== */


// From lab 1
$(document).ready(function() {

    $('#text-input1').prop('disabled', false)
    $('#text-input2').prop('disabled', false)
    $('#text-input3').prop('disabled', false)

    $('#text-input1').val("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json"),
    $('#text-input2').val("CapitalLatitude")
    $('#text-input3').val("CapitalLongitude")

    // $('#text-input1').val("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/philadelphia-bike-crashes-snippet.json"),
    // $('#text-input2').val("LAT")
    // $('#text-input3').val("LNG")

    function getInput(){
        var input = {
            url: $('#text-input1').val(),
            latKey: $('#text-input2').val(),
            lngKey: $('#text-input3').val(),
        }

        return input;
    }

    var parseData = function(data, input) {
        var parsed = JSON.parse(data)
        var parsedType = parsed.map(function(data){
            data[input.latKey] = parseFloat(data[input.latKey])
            data[input.lngKey] = parseFloat(data[input.lngKey])
            return data;
        })
        return parsedType;
    };

    var makeMarkers = function(data, input) {
        var markers = []
        markers.push(data.map(function (data) {
             return L.marker([data[input.latKey], data[input.lngKey]])
        }))
        return markers;
    };

    var plotMarkers = function(markers) {
        markers[0].forEach(function(marker) {
            console.log(marker)
            marker.addTo(map)
        })
    };

    var removeMarkers = function(markers) {
        markers[0].forEach(function(marker) {
            map.removeLayer(marker)
        })
    };


  //click and plot
  $("button").click(function(){

      if ($('#text-input1').val() ==="" || $('#text-input2').val() ==="" || $('#text-input3').val() ==="") {
          alert("Please enter all fields")
      }

      var dataObject = getInput()
      var downloadData = $.ajax(dataObject.url);
      console.log(dataObject)

      downloadData.done(function(data) {
        //removeMarkers(markers);
        var parsed = parseData(data, dataObject);
        var markers = makeMarkers(parsed, dataObject);
        plotMarkers(markers);

      });

      });

  });
