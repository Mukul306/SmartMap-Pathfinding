const {PriorityQueue} = require('./PriorityQueue.js')
const {UCSTreeNode} = require('./TreeNode.js')

/**
 * UCS (Uniform Cost Search) algorithm. Returns {route, cost}
 * @param {number[][]} AdjMatrix Weighted adjacency matrix (from input file)
 * @param {int} startID Starting node index in AdjMatrix
 * @param {int} goalID Goal node index in AdjMatrix
 * @param {{id, name, location}[]} nodesInfo Nodes information (from input file) 
 */
function UCS(AdjMatrix, startID, goalID, nodesInfo) {

    if (startID === goalID) {
        return {route: [nodesInfo.find(elmt => elmt.id === startID)], cost: 0}
    }

    // Initialize empty priority queue, set expand node to start node with no parent 
    const prioqueue = new PriorityQueue()
    const nodeCount = AdjMatrix.length
    let expandNodeIdx = startID
    const firstNodeObj = nodesInfo.find(elmt => elmt.id === startID)
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
                let liveNodeObj = nodesInfo.find(elmt => elmt.id === liveNodeID)
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
    while (expandNode.id !== goalID)
    
    const routeList = expandNode.getPathFromRoot()
    console.log("Number of iterations: " + iteration)
    return {route: routeList, cost: expandNode.distFromStart}
}

module.exports = {UCS}

