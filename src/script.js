// Initialize global variables
let nodes = [];
let adjacency = [];

$(document).ready(function() {
  // Initialize map
  var map = L.map('map').setView([-6.891416087075806, 107.61033723180078], 16);

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Load file
  $('#file-input').change(function() {
    let file = $(this).prop('files')[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function(e) {
        let data = JSON.parse(e.target.result);
      
        // Add nodes to map
        for (let node of data.nodes) {
          L.marker([node.lat, node.long]).addTo(map).bindPopup(node.name);
          // Add nodes to global variable
          // let newNode = new TreeNode(null, node.id, node.name, {lat: node.lat, long: node.long}, 0);
          nodes.push(node);
        }
      
        // Add edges to map
        for (let i = 0; i < data.adjacency.length; i++) {
          let edges = data.adjacency[i];
          for (let j = 0; j < edges.length; j++) {
            if (edges[j] > 0) {
              L.polyline([[data.nodes[i].lat, data.nodes[i].long], [data.nodes[j].lat, data.nodes[j].long]], {
                color: 'blue',
                weight: edges[j],
                opacity: 0.5,
                smoothFactor: 1
              }).addTo(map);
            }
          }
        }
      
        // Add adjacency to global variable
        adjacency = data.adjacency;
        
        // Add start nodes to dropdown
        for (let node of nodes) {
          console.log(nodes);
          $('#start-node').append(`<option value="${node.id}">${node.name}</option>`);
        }

        // Add end nodes to dropdown
        for (let node of nodes) {
          $('#end-node').append(`<option value="${node.id}">${node.name}</option>`);
        }
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
