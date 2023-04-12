/* ========== Event Listeners =========== */

// Initialize global variables
let nodes = [];
let adjacency = [];
let map;
let isWeighted;
const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".close");
const toastProgress = document.querySelector(".toast-progress");
let addRule = (function (style) {
  let sheet = document.head.appendChild(style).sheet;
  return function (selector, css) {
      let propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
          return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
      }).join(";");
      sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
  };
})(document.createElement("style"));

// Function to show success toast
function showSuccessToast(message, description) {
  // Hide error icon
  document.getElementById("error-icon").style.display = "none";

  addRule(".toast-progress:before", {
    content: "''",
    position: "absolute",
    bottom: 0,
    right: 0,
    height: "100%",
    width: "100%",
    "background-color": "#4070F4"
  });

  toast.classList.add("active");
  toastProgress.classList.add("active");
  toast.querySelector(".notif-msg").innerHTML = message;
  toast.querySelector(".notif-desc").innerHTML = description;
  toast.style.borderLeft = "6px solid #4070F4";
  document.getElementById("success-icon").style.backgroundColor = "#4070F4";
  document.getElementById("success-icon").style.display = "flex";

  setTimeout(() => {
    toast.classList.remove("active");
    }, 3000);

  setTimeout(() => {
    toastProgress.classList.remove("active");
  }, 3300);
}

// Function to show error toast
function showErrorToast(message, description) {
  // Hide success icon
  document.getElementById("success-icon").style.display = "none";

  addRule(".toast-progress:before", {
      content: "''",
      position: "absolute",
      bottom: 0,
      right: 0,
      height: "100%",
      width: "100%",
      "background-color": "#CC0000"
  });

  toast.classList.add("active");
  toastProgress.classList.add("active");
  toast.querySelector(".notif-msg").innerHTML = message;
  toast.querySelector(".notif-desc").innerHTML = description;
  document.getElementById("error-icon").style.backgroundColor = "#CC0000";
  document.getElementById("error-icon").style.display = "flex";
  toast.style.borderLeft = "6px solid #CC0000";

  setTimeout(() => {
    toast.classList.remove("active");
  }, 3000);

  setTimeout(() => {
    toastProgress.classList.remove("active");
  }, 3300);
}

// Set event listener for toast close icon
closeIcon.addEventListener("click", () => {
  toast.classList.remove("active");

  setTimeout(() => {
    toastProgress.classList.remove("active");
  }, 300);
});

$(document).ready(function() {
  // Initialize map
  map = L.map('map').setView([-6.891416087075806, 107.61033723180078], 16);

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Load file
  $('#file-input').change(function() {
    // Clear map
    map.eachLayer(function(layer) {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Clear dropdowns
    $('#start-node').empty();
    $('#end-node').empty();

    // Hide result
    document.getElementById("popup").style.display = "none";

    // Clear global variables
    nodes = [];
    adjacency = [];

    // Read file
    let file = $(this).prop('files')[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function(e) {
        let data = JSON.parse(e.target.result);
      
        // Add nodes to map
        try {
          for (let node of data.nodes) {
            let marker = L.marker([node.location.lat, node.location.long])
            marker.addTo(map).bindPopup(node.name);
  
            // Add nodes to global variable
            nodes.push(node);
          }

          // Add edges to map
          for (let i = 0; i < data.adjacency.length; i++) {
            let edges = data.adjacency[i];
            for (let j = 0; j < edges.length; j++) {
              if (edges[j] > 0) {
                L.polyline([[data.nodes[i].location.lat, data.nodes[i].location.long], [data.nodes[j].location.lat, data.nodes[j].location.long]], {
                  color: 'blue',
                  opacity: 0.5,
                  smoothFactor: 1
                }).addTo(map);
              }
            }
          }
        } catch (e) {
          showErrorToast("Error", "Invalid file format");
          return;
        }
      
        // Add adjacency to global variable
        adjacency = data.adjacency;

        isWeighted = data.weighted;

        // Adjust map view
        map.fitBounds(L.latLngBounds(nodes.map(node => [node.location.lat, node.location.long])));
        
        // Add start nodes to dropdown
        for (let node of nodes) {
          $('#start-node').append(`<option value="${node.id}">${node.name}</option>`);
        }

        // Add end nodes to dropdown
        for (let node of nodes) {
          $('#end-node').append(`<option value="${node.id}">${node.name}</option>`);
        }
      }

      showSuccessToast("Success", "File has been loaded successfully");

      reader.readAsText(file);
    }
  });

  // Start search
  $('#search-btn').click(function() {
    let startNode = $('#start-node').val();
    let endNode = $('#end-node').val();
    let searchAlgorithm = $('#search-algorithm').val();
    let path;

    // Clear map
    map.eachLayer(layer => {
      if (layer instanceof L.Polyline || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Readd markers
    for (let node of nodes) {
      let marker = L.marker([node.location.lat, node.location.long])
      marker.addTo(map).bindPopup(node.name);
    }

    // Readd edges to map
    for (let i = 0; i < adjacency.length; i++) {
      let edges = adjacency[i];
      for (let j = 0; j < edges.length; j++) {
        if (edges[j] > 0) {
          L.polyline([[nodes[i].location.lat, nodes[i].location.long], [nodes[j].location.lat, nodes[j].location.long]], {
            color: 'blue',
            opacity: 0.5,
            smoothFactor: 1
          }).addTo(map);
        }
      }
    }

    let weightedAdjacency = JSON.parse(JSON.stringify(adjacency));
    if (!isWeighted) { // if adjacency matrix in JSON is not weighted, find the distance manually
      for (let i = 0; i < adjacency.length; i++) {
        for (let j = 0; j < adjacency[0].length ;j++) {
          console.log(weightedAdjacency[i][j] + ' ')
          if (adjacency[i][j] === 1) {
            let iLocation = nodes.find(node => node.id === i);
            let jLocation = nodes.find(node => node.id === j);
            weightedAdjacency[i][j] = haversineDistance(iLocation, jLocation);
          }
        }
      }
    }

    // Perform search
    if (searchAlgorithm === 'UCS') {
      path = UCS(weightedAdjacency, startNode, endNode, nodes);
    } else {
      path = Astar(weightedAdjacency, startNode, endNode, nodes, haversineDistance);
    }

    let route = path.route;
    let routeNames = route.map(node => node.name);
    let cost = path.cost;

    // Show the path popup
    document.getElementById("popup").style.display = "block";

    // Get the path elements
    const shortestPath = document.getElementById('shortest-path');
    const totalCost = document.getElementById('total-cost');

    // Set the text of the path elements
    shortestPath.textContent = routeNames.join(' → ');
    totalCost.textContent = cost;

    // Adjust map view
    map.fitBounds(L.latLngBounds(nodes.map(node => [node.location.lat, node.location.long])));

    // Show edges of path on map
    for (let i = 0; i < route.length - 1; i++) {
      let currNode = nodes.find(node => node.id == route[i].id);
      let nextNode = nodes.find(node => node.id == route[i+1].id);
      L.polyline([[currNode.location.lat, currNode.location.long], [nextNode.location.lat, nextNode.location.long]], {
        color: 'green',
        weight: 5,
        opacity: 0.8,
        smoothFactor: 1
      }).addTo(map);
    }

    // Set start and end nodes marker to red
    // Create a custom icon with a red marker
    let redIcon = L.icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    let startNodeObj = nodes.find(node => node.id == startNode);
    let endNodeObj = nodes.find(node => node.id == endNode);

    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {

        let latlng = layer.getLatLng();
        if (latlng.lat == startNodeObj.location.lat && latlng.lng == startNodeObj.location.long) {
          layer.setIcon(redIcon);
        } else if (latlng.lat == endNodeObj.location.lat && latlng.lng == endNodeObj.location.long) {
          layer.setIcon(redIcon);
        }
      }
    });

  });
});


/* ========= Algorithms =========== */
/*
 * The data structure and algorithms are placed in the script as the web environment in plain 
 * HTML CSS JS does not support imports from other modules. If you want to read and navigate 
 * through the data structure and algorithms, it is recommended to check out src/modules
 * 
 */

/**
 * @class TreeNode
 * @abstract This is a node for searching algorithms
 */
class TreeNode {
  constructor(parent, id, name, location, distFromStart) {
      this.parent = parent
      this.id = id
      this.name = name
      this.location = location
      this.distFromStart = distFromStart
  }

  printInfo() {
      console.log(this.id, this.name, this.location, this.priority)
  }

  getPathFromRoot() {
      const path = []
      let currentNode = this
      while (currentNode !== null) {
          path.unshift(currentNode)
          currentNode = currentNode.parent
      }
      return path
  }

  /**
   * A helper method to see if a node is already visited in this path to avoid going back and forth
   *  (mondar-mandir)
   * @param {int} nodeId 
   * @returns ans
   */
  isNodeAlreadyVisited(nodeId) {
      let currentNode = this
      while (currentNode !== null) {
          if (currentNode.id == nodeId) return true
          currentNode = currentNode.parent
      }
      return false
  }

  /**
   * @abstract
   * Node priority depends on implementation of search algorithm.
   ** UCS => priority = distance from start node
   ** A*  => priority = distance from start node + heuristic (distance approx from current node to goal node)
   */
  get priority() {}
}

class UCSTreeNode extends TreeNode {
  constructor(parent, id, name, location, distFromStart) {
      super(parent, id, name, location, distFromStart)
  }

  get priority() {
      return this.distFromStart
  }
}

class AstarTreeNode extends TreeNode {
  constructor(parent, id, name, location, distFromStart, goalNode, heuristic) {
      super(parent, id, name, location, distFromStart)
      this.goalNode = goalNode
      this.heuristic = heuristic
  }

  get priority() {
      return this.distFromStart + this.heuristic(this, this.goalNode)
  }
}

/**
 * @class PriorityQueue
 * @abstract This is a priority queue for searching algorithms
 */
class PriorityQueue {
  constructor() {
      this.list = []
  }

  isEmpty() {
      return this.list.length == 0
  }

  enqueue(elmt) {
      const index = this.list.findIndex((item) => item.priority > elmt.priority);
      if (index === -1) {
          this.list.push(elmt);
      } 
      else {
          this.list.splice(index, 0, elmt);
      }
  }

  dequeue() {
      return this.list.shift()
  }

  printAllInfo() {
      if (this.isEmpty()) {
          console.log("kosong...")
      }
      else {
          console.log("Queue elements: ")
          this.list.forEach(elmt => elmt.printInfo())
      }
  }

  minPriority() {
      let min = Infinity
      for (let elmt of this.list) {
          if (elmt.priority < min) min = elmt.priority
      }
      return min
  }
}

function euclideanDistance(nodeA, nodeB) {
  const x = nodeA.location.x - nodeB.location.x;
  const y = nodeA.location.y - nodeB.location.y;

  return Math.sqrt(x ** 2 + y ** 2);
}

function haversineDistance(nodeA, nodeB) {
  const earthRadius = 6371; // in kilometers

  const lat1 = nodeA.location.lat;
  const lon1 = nodeA.location.long;
  const lat2 = nodeB.location.lat;
  const lon2 = nodeB.location.long;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const haversine =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  const distance = 2 * earthRadius * Math.asin(Math.sqrt(haversine));

  return distance;
}

// TODO: validasi graf, validasi index graf, validasi apakah start terhubung ke goal

/**
 * UCS (Uniform Cost Search) algorithm. Returns {route, cost}
 * @param {number[][]} AdjMatrix Weighted adjacency matrix (from input file)
 * @param {int} startID Starting node index in AdjMatrix
 * @param {int} goalID Goal node index in AdjMatrix
 * @param {{id, name, location}[]} nodesInfo Nodes information (from input file) 
 */
function UCS(AdjMatrix, startID, goalID, nodesInfo) {
    // TODO: validasi AdjMatrix, dan validasi apakah 0 <= startID, goalID < AdjMatrix.length

    // TODO: validasi apakah start node terhubung dengan goal node

    if (startID === goalID) {
        return {route: [nodesInfo.find(elmt => elmt.id == startID)], cost: 0}
    }
    
    // Initialize empty priority queue, set expand node to start node with no parent 
    const prioqueue = new PriorityQueue()
    const nodeCount = AdjMatrix.length
    let expandNodeIdx = startID
    const firstNodeObj = nodesInfo.find(node => node.id == startID)

    let expandNode = new UCSTreeNode(null, expandNodeIdx, firstNodeObj.name, firstNodeObj.location, 0)

    /*
     * In UCS, once expand node = goal node, searching process stops since priority queue is
     * sorted by distance from start node to current node
     */
    let iteration = 0
    do {
        iteration++
        // Check every neighbor of expand node, add to priority queue as live node
        for (let i = 0; i < nodeCount; i++) {
            const distance = AdjMatrix[expandNodeIdx][i]
            if (distance !== 0) {
                let liveNodeID = i
                if (expandNode.isNodeAlreadyVisited(i)) continue
                let liveNodeObj = nodesInfo.find(elmt => elmt.id == liveNodeID)
                let distFromStart = expandNode.distFromStart + distance
                const liveNode = new UCSTreeNode(expandNode, liveNodeID, liveNodeObj.name, 
                                                liveNodeObj.location, distFromStart)
                prioqueue.enqueue(liveNode)
            }
        }

        // Dequeue priority queue, set dequeued element as expand node
        expandNode = prioqueue.dequeue()
        expandNodeIdx = expandNode.id
    }
    while (expandNode.id != goalID)
    
    const routeList = expandNode.getPathFromRoot()
    console.log("Number of iterations: " + iteration)
    return {route: routeList, cost: expandNode.distFromStart}
}

/**
 * A* search algorithm. Returns {route, cost}
 * @param {number[][]} AdjMatrix Weighted adjacency matrix (from input file)
 * @param {int} startID Starting node index in AdjMatrix
 * @param {int} goalID Goal node index in AdjMatrix
 * @param {{id, name, location}[]} nodesInfo Nodes information (from input file)
 * @param {(node1, node2) => number} heuristic, node1 and node2 must at least contain {id, name, location}
 */
function Astar(AdjMatrix, startID, goalID, nodesInfo, heuristic) {
    // TODO: validasi AdjMatrix, dan validasi apakah 0 <= startID, goalID < AdjMatrix.length

    // TODO: validasi apakah start node terhubung dengan goal node

    if (startID == goalID) {
        return {route: [nodesInfo.find(elmt => elmt.id == startID)], cost: 0}
    }

    // Initialize empty priority queue, set expand node to start node with no parent 
    // and best path so far to null 
    const prioqueue = new PriorityQueue()
    const nodeCount = AdjMatrix.length
    let expandNodeIdx = startID
    const firstNodeObj = nodesInfo.find(elmt => elmt.id == startID)
    const goalNodeObj = nodesInfo.find(elmt => elmt.id == goalID)
    let expandNode = new AstarTreeNode(null, expandNodeIdx, firstNodeObj.name, firstNodeObj.location, 
                                        0, goalNodeObj, heuristic)
    let bestPath = null

    /*
     * In A*, searching process repeats until expand node = goal node and its distance
     * from start node is less than/equal to approximate/predicted distance of any node in priority 
     * queue to goal node. Priority is sorted by this formula:
     * distance from start node to current node + heuristic distance from current node to goal node
     */
    let iteration = 0
    do {
        iteration++
        // Check every neighbor of expand node, add to priority queue as live node
        for (let i = 0; i < nodeCount; i++) {
            const distance = AdjMatrix[expandNodeIdx][i]
            if (distance !== 0) {
                let liveNodeID = i
                if (expandNode.isNodeAlreadyVisited(i)) continue
                let liveNodeObj = nodesInfo.find(elmt => elmt.id == liveNodeID)
                let distFromStart = expandNode.distFromStart + distance
                const liveNode = new AstarTreeNode(expandNode, liveNodeID, liveNodeObj.name, 
                                                    liveNodeObj.location, distFromStart, goalNodeObj, heuristic)
                prioqueue.enqueue(liveNode)
            }
        }

        // Dequeue priority queue, set dequeued element as expand node
        expandNode = prioqueue.dequeue()
        expandNodeIdx = expandNode.id

        // Update best path so far if needed
        if (expandNode.id == goalID) {
            if (bestPath == null || expandNode.distFromStart < bestPath.distFromStart) {
                bestPath = expandNode
            }
        }
    }
    while (!(bestPath !== null && bestPath.distFromStart <= prioqueue.minPriority()))
    
    const routeList = bestPath.getPathFromRoot()
    console.log("Number of iterations: " + iteration)
    return {route: routeList, cost: bestPath.distFromStart}
}




