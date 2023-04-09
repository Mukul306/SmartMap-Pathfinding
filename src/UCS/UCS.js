import {PriorityQueue, UCSTreeNode} from './PriorityQueue.js'

/**
 * 
 * @param {*} matrix Weighted adjacency matrix, didapat dari hasil input file
 * @param {*} startID Index node awal pada matrix
 * @param {*} finishID Index node akhir pada matrix
 * @param {Array<{id, name, location}>} nodesInfo Array informasi node, didapat dari hasil input file
 */
export function UCS(matrix, startID, finishID, nodesInfo) {
    // TODO: validasi matrix, dan validasi apakah 0 <= startID, finishID < matrix.length

    // TODO: validasi apakah start node terhubung dengan finish node

    if (startID === finishID) {
        return [nodesInfo.find(elmt => elmt.id === startID)]
    }

    const prioqueue = new PriorityQueue()
    const nodeCount = matrix.length
    let expandNodeIdx = startID
    const firstNodeObj = nodesInfo.find(elmt => elmt.id === startID)
    let expandNode = new UCSTreeNode(null, expandNodeIdx, firstNodeObj.name, firstNodeObj.location, 0)

    do {
        for (let i = 0; i < nodeCount; i++) {
            const distance = matrix[expandNodeIdx][i]
            if (/* i !== expandNodeIdx && */ distance !== 0) {
                let liveNodeID = i
                let liveNodeObj = nodesInfo.find(elmt => elmt.id === liveNodeID)
                let distFromStart = expandNode.distFromStart + distance
                const liveNode = new UCSTreeNode(expandNode, liveNodeID, liveNodeObj.name, liveNodeObj.location, distFromStart)
                prioqueue.enqueue(liveNode)
            }
        }

        expandNode = prioqueue.dequeue()
        expandNodeIdx = expandNode.id
    }
    while (expandNode.id !== finishID)
    
    const routeList = expandNode.getPathFromRoot()
    // let routeNode = expandNode
    // while (routeNode != null) {
    //     routeList.unshift(routeNode.name)
    //     routeNode = routeNode.parent
    // }

    return routeList
}


