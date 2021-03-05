/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */


  $('#text-input1').prop('disabled',false);
  $('#text-input2').prop('disabled',false);
  $('#text-input3').prop('disabled',false);

  var parseData = function(data) {
      return JSON.parse(data)
  };

  var makeMarkers = function(objs, lat, lon) {
    return objs.map(obj => L.marker([obj[lat], obj[lon]]));
  };

  var plotMarkers = function(markers) {
    markers.forEach(marker=>marker.addTo(map))
};

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



