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

/* =====================
 CODE EXECUTED HERE!
===================== */
$(document).ready(function() {
    //functions
    var parseData = function(data) {
        let parsed = JSON.parse(data);
        console.log(parsed);
        return parsed;
    };

    var makeMarkers = function(data,key1,key2) {
        let markerlst = []
        data.forEach((item) =>{
            var marker = L.marker([item[key1], item[key2]]);
         markerlst.push(marker);
        });
        return markerlst;
    };

    var plotMarkers = function(lst) {
        lst.forEach((item) =>{
            item.addTo(map);
        })
    };

    var removeMarkers = function(lst) {
        lst.forEach((item) =>{
            map.removeLayer(item);
            })
        };

    //input
    $('#text-input1').prop('disabled', false);
    $('#text-input2').prop('disabled', false);
    $('#text-input3').prop('disabled', false);
    var myMarkers = [];

    $('button').click(function() {
        removeMarkers(myMarkers);

        textField1 = $('#text-input1').val();
        textField2 = $('#text-input2').val();   
        textField3 = $('#text-input3').val();

        if(textField1===""||textField2==="" || textField3===""){
            console.log("The input is invalid.");
        }

        var downloadData = $.ajax(textField1);
        downloadData.done(function(data) {
            var myData = parseData(data);
            myMarkers = makeMarkers(myData,textField2,textField3);
            plotMarkers(myMarkers);
          });      
    
      });
})


