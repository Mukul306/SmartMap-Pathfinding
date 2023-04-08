const Node = require('./modules/Node');
const astar = require('./modules/AStar');
// const { findAStarPath } = require('./modules/AStarQueue');

// Define the graph
const nodeA = new Node(0, null, {longitude: 0, latitude: 0});
const nodeB = new Node(1, null, {longitude: 0, latitude: 1});
const nodeC = new Node(2, null, {longitude: 0, latitude: 2});
const nodeD = new Node(3, null, {longitude: 1, latitude: 1});
const nodeE = new Node(4, null, {longitude: 1, latitude: 2});
const nodeF = new Node(5, null, {longitude: 2, latitude: 2});
const nodeG = new Node(6, null, {longitude: 1, latitude: 3});
const nodeH = new Node(7, null, {longitude: 2, latitude: 3});

nodeA.neighbors = [nodeB];
nodeB.neighbors = [nodeA, nodeC, nodeD];
nodeC.neighbors = [nodeB, nodeD];
nodeD.neighbors = [nodeB, nodeE, nodeC];
nodeE.neighbors = [nodeD, nodeG, nodeF];
nodeF.neighbors = [nodeE];
nodeG.neighbors = [nodeE, nodeH];
nodeH.neighbors = [nodeF, nodeG];

const adjacency = [
    [0, 2, 0, 0, 0, 0, 0, 0],
    [2, 0, 4, 5, 0, 0, 0, 0],
    [0, 4, 0, 4, 0, 0, 0, 0],
    [0, 5, 4, 0, 3, 0, 0, 0],
    [0, 0, 0, 3, 0, 1, 7, 0],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 7, 0, 0, 2],
    [0, 0, 0, 0, 0, 1, 2, 0]
]

/*
       2   4  
    A -- B -- C
      5 |   / 4
        |  /    7
        D -- E -- G
          3  |    | 2
             | 1  |
             F -- H
               1
*/

// Find the shortest path from nodeA to nodeG using the A* algorithm
// const path = findAStarPath(adjacency, nodeA, nodeG);
// Usage
const path = astar(nodeA, nodeG, adjacency);

// Print the path
if (path !== null) {
    console.log("Shortest path from nodeA to nodeG: ");
    console.log(path.map(node => node.id).join(' -> '));
} else {
    console.log("No path found");
}