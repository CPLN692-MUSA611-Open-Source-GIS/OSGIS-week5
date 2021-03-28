/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
$(document).ready(function() {
  //Setting (writing) input values
   $("input#text-input1").val("http://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json")
   $("input#text-input2").val("CapitalLatitude")
   $("input#text-input3").val("CapitalLongitude")
  
   //Enable user interaction with the form
   $('input#text-input1').prop('disabled', false);
   $('input#text-input2').prop('disabled', false);
   $('input#text-input3').prop('disabled', false);

   $('button').click(function(){
  //Getting (reading) input values
    let input=[]
    if ($("input#text-input1").val()==""){
     input.url= "http://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json"
    }else{
     input.url = $("input#text-input1").val()
    }

    if ($("input#text-input2").val()==""){
      input.latKey ="CapitalLatitude"
    }else{
     input.latKey = $("input#text-input2").val()
    }

    if($("input#text-input3").val()==""){
      input.lngKey = "CapitalLongitude"
    }else{
     input.lngKey = $("input#text-input3").val()
    }  
    console.log(input)

  var downloadData = $.ajax(input.url);
  console.log(downloadData)

  var parseData = function(res) {  
   let parsed = JSON.parse(res)
   return parsed
  };


  //parseData(downloadData)

  // Write a function to use your parsed data to create a bunch of
  // marker objects (don't plot them!)
  var makeMarkers = function(parsed) { 
   var markerlist = []
   parsed.forEach(function(capital){  
     lat = capital[input.latKey];
     lng = capital[input.lngKey];
     Content = capital.CapitalName + ", \n" + capital.CountryName+ ", \n" + capital.ContinentName;
     marker = L.marker([lat, lng])
      markerlist.push(marker)
    })
    console.log(markerlist)
    return markerlist
  }


  var plotMarkers = function(markerlist) {
   markerlist.forEach(function(m){
     m.addTo(map)
   }) 

  };

  var removeMarkers = function(markerlist) {
   markerlist.forEach(function(m){
     map.removeLayer(m)
   })
  
  };

  /* =====================
   CODE EXECUTED HERE!
  ===================== */

  downloadData.done(function(data) {
   var parsed = parseData(data);
   var markers = makeMarkers(parsed);
   plotMarkers(markers);
   //removeMarkers(markers);
    });
   })

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
});
