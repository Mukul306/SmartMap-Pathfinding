// Initialize the map
var mymap = L.map('mapid').setView([0, 0], 1);

// Add the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(mymap);

// Initialize the nodes array
var nodes = [];

function loadNodes() {
    // Get the file input element and the selected file
    var input = document.getElementById('fileInput');
    var file = input.files[0];
  
    // Create a new FileReader object
    var reader = new FileReader();
  
    // Define the function to be run when the file has been successfully loaded
    reader.onload = function(event) {
      // Get the JSON data from the file
      var json = JSON.parse(event.target.result);
  
      // Loop through each node in the JSON data
      for (var i = 0; i < json.length; i++) {
        // Get the latitude and longitude of the node
        var lat = json[i].lat;
        var lng = json[i].lng;
  
        // Create a new marker at the node's location
        var marker = L.marker([lat, lng]).addTo(map);
  
        // Set the marker's tooltip to the node's name
        marker.bindTooltip(json[i].name);
      }
    };
  
    // Read the selected file as text
    reader.readAsText(file);
  }  

// Function to read input JSON file
function readJSONFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => resolve(JSON.parse(reader.result));
      reader.onerror = error => reject(error);
    });
  }
  
  // Function to create a Leaflet marker for a node
  function createNodeMarker(node) {
    return L.marker([node.lat, node.lng])
      .bindPopup(`<strong>${node.name}</strong><br>(${node.lat}, ${node.lng})`)
      .addTo(map);
  }
  
  // Function to show all nodes on the map
  function showNodes(nodes) {
    nodes.forEach(node => createNodeMarker(node));
  }
  
  // Initialize Leaflet map
  const map = L.map('mapid').setView([0, 0], 1);
  
  // Add tile layer to map
  const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18
  }).addTo(map);
  
  // Get input file element and listen for changes
  const fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', async () => {
    // Read input file and show nodes on the map
    const file = fileInput.files[0];
    const nodes = await readJSONFile(file);
    showNodes(nodes);
  });
