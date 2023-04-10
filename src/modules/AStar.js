const {PriorityQueue} = require('./PriorityQueue')
const {AstarTreeNode} = require('./TreeNode')

/**
 * Fungsi pencarian Astar, return berupa path dan cost dalam javascript object
 * @param {*} AdjMatrix Weighted adjacency AdjMatrix, didapat dari hasil input file
 * @param {*} startID Index node awal pada AdjMatrix
 * @param {*} finishID Index node akhir pada AdjMatrix
 * @param {Array<{id, name, location}>} nodesInfo Array informasi node, didapat dari hasil input file
 */
function Astar(AdjMatrix, startID, finishID, nodesInfo) {
    // TODO: validasi AdjMatrix, dan validasi apakah 0 <= startID, finishID < AdjMatrix.length

    // TODO: validasi apakah start node terhubung dengan finish node

    if (startID === finishID) {
        return {route: [nodesInfo.find(elmt => elmt.id === startID)], cost: 0}
    }

    // Initialize empty priority queue, set expand node to start node with no parent 
    // and best path so far to null 
    const prioqueue = new PriorityQueue()
    const nodeCount = AdjMatrix.length
    let expandNodeIdx = startID
    const firstNodeObj = nodesInfo.find(elmt => elmt.id === startID)
    const goalLocation = nodesInfo.find(elmt => elmt.id === finishID).location
    let expandNode = new AstarTreeNode(null, expandNodeIdx, firstNodeObj.name, firstNodeObj.location, 
                                        0, goalLocation)
    let bestPath = null

    /*
     * In A*, searching process is repeated until expand node = goal node and its distance
     * from start node is less than/equal to approximate/predicted distance of any node in priority 
     * queue to goal node. Priority is sorted by this formula:
     * distance from start node to current node + heuristic distance from current node to goal node
     */

    do {
        // Check every neighbor of expand node, add to priority queue as live node
        for (let i = 0; i < nodeCount; i++) {
            const distance = AdjMatrix[expandNodeIdx][i]
            if (distance !== 0) {
                let liveNodeID = i
                let liveNodeObj = nodesInfo.find(elmt => elmt.id === liveNodeID)
                let distFromStart = expandNode.distFromStart + distance
                const liveNode = new AstarTreeNode(expandNode, liveNodeID, liveNodeObj.name, 
                                                    liveNodeObj.location, distFromStart, goalLocation)
                prioqueue.enqueue(liveNode)
            }
        }

        // Dequeue priority queue, set dequeued element as expand node
        expandNode = prioqueue.dequeue()
        expandNodeIdx = expandNode.id

        // Update best path so far if needed
        if (expandNode.id === finishID) {
            if (bestPath === null || expandNode.distFromStart < bestPath.distFromStart) {
                bestPath = expandNode
            }
        }
    }
    while (!(bestPath !== null && bestPath.distFromStart <= prioqueue.minPriority()))
    
    const routeList = bestPath.getPathFromRoot()

    return {route: routeList, cost: bestPath.distFromStart}
}

module.exports = {Astar}