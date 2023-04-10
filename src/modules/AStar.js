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

    const prioqueue = new PriorityQueue()
    const nodeCount = AdjMatrix.length
    let expandNodeIdx = startID
    const firstNodeObj = nodesInfo.find(elmt => elmt.id === startID)
    const goalLocation = nodesInfo.find(elmt => elmt.id === finishID).location
    let expandNode = new AstarTreeNode(null, expandNodeIdx, firstNodeObj.name, firstNodeObj.location, 
                                        0, goalLocation)

    do {
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

        expandNode = prioqueue.dequeue()
        expandNodeIdx = expandNode.id
    }
    while (expandNode.id !== finishID)
    
    const routeList = expandNode.getPathFromRoot()

    return {route: routeList, cost: expandNode.distFromStart}
}

module.exports = {Astar}