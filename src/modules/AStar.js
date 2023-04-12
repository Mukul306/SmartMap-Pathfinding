const {PriorityQueue} = require('./PriorityQueue')
const {AstarTreeNode} = require('./TreeNode')

/**
 * A* search algorithm. Returns {route, cost}
 * @param {number[][]} AdjMatrix Weighted adjacency matrix (from input file)
 * @param {int} startID Starting node index in AdjMatrix
 * @param {int} goalID Goal node index in AdjMatrix
 * @param {{id, name, location}[]} nodesInfo Nodes information (from input file)
 * @param {(node1, node2) => number} heuristic, node1 and node2 must at least contain {id, name, location}
 */
function Astar(AdjMatrix, startID, goalID, nodesInfo, heuristic) {

    if (startID === goalID) {
        return {route: [nodesInfo.find(elmt => elmt.id === startID)], cost: 0}
    }

    // Initialize empty priority queue, set expand node to start node with no parent 
    // and best path so far to null 
    const prioqueue = new PriorityQueue()
    const nodeCount = AdjMatrix.length
    let expandNodeIdx = startID
    const firstNodeObj = nodesInfo.find(elmt => elmt.id === startID)
    const goalNodeObj = nodesInfo.find(elmt => elmt.id === goalID)
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
                let liveNodeObj = nodesInfo.find(elmt => elmt.id === liveNodeID)
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
        if (expandNode.id === goalID) {
            if (bestPath === null || expandNode.distFromStart < bestPath.distFromStart) {
                bestPath = expandNode
            }
        }
    }
    while (!(bestPath !== null && bestPath.distFromStart <= prioqueue.minPriority()))
    
    const routeList = bestPath.getPathFromRoot()
    console.log("Number of iterations: " + iteration)
    return {route: routeList, cost: bestPath.distFromStart}
}

module.exports = {Astar}