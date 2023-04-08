const PriorityQueue = require("./PriorityQueue");

function ucs(start, goal, adjacency) {
  // Initialize open and closed list
  const open = new PriorityQueue();
  const closed = new Set();
  const g = new Map();

  g.set(start, 0);
  start.priority = g.get(start);

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
        neighbor.priority = g.get(neighbor);
        neighbor.parent = current;

        if (!open.includes(neighbor)) {
          open.enqueue(neighbor);
        } else {
            open.updatePriority(neighbor, neighbor.priority);
        }
      }
    }
  }

  return null;
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

module.exports = ucs;
