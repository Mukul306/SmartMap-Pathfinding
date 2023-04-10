const {PriorityQueue} = require('./PriorityQueue.js')
const {UCSTreeNode} = require('./TreeNode.js')

/**
 * Fungsi pencarian UCS, return berupa path dan cost dalam javascript object
 * @param {*} AdjMatrix Weighted adjacency AdjMatrix, didapat dari hasil input file
 * @param {*} startID Index node awal pada AdjMatrix
 * @param {*} finishID Index node akhir pada AdjMatrix
 * @param {Array<{id, name, location}>} nodesInfo Array informasi node, didapat dari hasil input file
 */
function UCS(AdjMatrix, startID, finishID, nodesInfo) {
    // TODO: validasi AdjMatrix, dan validasi apakah 0 <= startID, finishID < AdjMatrix.length

    // TODO: validasi apakah start node terhubung dengan finish node

    if (startID === finishID) {
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

    do {
        // Check every neighbor of expand node, add to priority queue as live node
        for (let i = 0; i < nodeCount; i++) {
            const distance = AdjMatrix[expandNodeIdx][i]
            if (distance !== 0) {
                let liveNodeID = i
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
    while (expandNode.id !== finishID)
    
    const routeList = expandNode.getPathFromRoot()

    return {route: routeList, cost: expandNode.distFromStart}
}

module.exports = {UCS}

