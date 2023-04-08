const PriorityQueue = require("./PriorityQueue");

function astar(start, goal, adjacency) {
  // Initialize open and closed list
  const open = new PriorityQueue();
  const closed = new Set();
  const g = new Map();
  const f = new Map();

  g.set(start, 0);
  f.set(start, heuristic(start, goal));
  start.priority = f.get(start);

  open.enqueue(start);

  while (!open.isEmpty()) {
    const current = open.dequeue();

    if (current === goal) {
      return reconstructPath(current);
    }

    closed.add(current);

    for (const neighbor of current.neighbors) {
      if (closed.has(neighbor)) {
        continue;
      }

      const tentativeG = g.get(current) + adjacency[current.id][neighbor.id];

      if (!open.includes(neighbor) || tentativeG < g.get(neighbor)) {
        g.set(neighbor, tentativeG);
        f.set(neighbor, g.get(neighbor) + heuristic(neighbor, goal));
        neighbor.priority = f.get(neighbor);
        neighbor.parent = current;

        if (!open.includes(neighbor)) {
          open.enqueue(neighbor);
        }
      }
    }
  }

  return null;
}

function haversineDistance(a, b) {
  const earthRadius = 6371; // in kilometers

  const lat1 = a.position.latitude;
  const lon1 = a.position.longitude;
  const lat2 = b.position.latitude;
  const lon2 = b.position.longitude;

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

function heuristic(a, b) {
  return haversineDistance(a, b);
}

function reconstructPath(goal) {
  const path = [goal];
  let current = goal;
  
  while (current.parent !== null) {
    path.unshift(current.parent);
    current = current.parent;
  }
  
  return path;
}

module.exports = astar;
