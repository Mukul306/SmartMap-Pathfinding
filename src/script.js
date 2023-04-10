$(document).ready(function() {
  // Initialize map
  var map = L.map('map').setView([-6.891416087075806, 107.61033723180078], 16);

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Add search control
  var searchControl = L.control.search({
    layer: L.geoJSON(),
    propertyName: 'name',
    marker: false,
    moveToLocation: function(latlng, title, map) {
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  }).addTo(map);

  // Load file
  $('#file-input').change(function() {
    var file = $(this).prop('files')[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = JSON.parse(e.target.result);
        // Add data to map
        // ...
        // Populate start and end node dropdowns
        // ...
      }
      reader.readAsText(file);
    }
  });

  // Start search
  $('#search-btn').click(function() {
    var startNode = $('#start-node').val();
    var endNode = $('#end-node').val();
    var searchAlgorithm = $('#search-algorithm').val();
    // Perform search
    // ...
  });
});
