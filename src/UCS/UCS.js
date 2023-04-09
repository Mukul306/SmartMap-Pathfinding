import {PriorityQueue, TreeNode} from './PriorityQueue.js'

/**
 * 
 * @param {*} matrix Weighted adjacency matrix
 * @param {*} start Index node awal pada matrix
 * @param {*} finish Index node akhir pada matrix
 */
function UCS(matrix, start, finish, nodeNames) {
    if (start === finish) {
        return [nodeNames[start]]
    }

    const prioqueue = new PriorityQueue()
    const nodeCount = matrix[0].length
    let expandNode = new TreeNode(null, nodeNames[start], null, 0)
    let expandNodeIdx = start
    do {
        for (let i = 0; i < nodeCount; i++) {
            const distance = matrix[expandNodeIdx][i]
            if (/* i !== expandNodeIdx && */ distance !== 0) {
                let name = nodeNames[i]
                let distFromStart = expandNode.distFromStart + distance
                const liveNode = new TreeNode(expandNode, name, null, distFromStart)
                prioqueue.enqueue(liveNode)
            }
        }

        expandNode = prioqueue.dequeue()
        expandNodeIdx = nodeNames.indexOf(expandNode.name)
    }
    while (expandNode.name !== nodeNames[finish])
    
    const routeList = expandNode.getPathFromRoot()
    // let routeNode = expandNode
    // while (routeNode != null) {
    //     routeList.unshift(routeNode.name)
    //     routeNode = routeNode.parent
    // }

    return routeList
}


const testMatrix1 = [
                    [0, 6, 0, 0, 0, 3, 0, 0, 0, 0], 
                    [6, 0, 3, 2, 0, 0, 0, 0, 0, 0], 
                    [0, 3, 0, 1, 5, 0, 0, 0, 0, 0],
                    [0, 2, 1, 0, 8, 0, 0, 0, 0, 0],
                    [0, 0, 5, 8, 0, 0, 0, 0, 5, 5], 
                    [3, 0, 0, 0, 0, 0, 1, 7, 0, 0],
                    [0, 0, 0, 0, 0, 1, 0, 0, 3, 0],
                    [0, 0, 0, 0, 0, 7, 0, 0, 2, 0],
                    [0, 0, 0, 0, 5, 0, 3, 2, 0, 3], 
                    [0, 0, 0, 0, 5, 0, 0, 0, 3, 0]
                ]

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

// for (let i = 0; i < 8; i++) {
//     for (let j = 0; j < 8; j++) {
//         if (adjacency[i][j] == 0) {
//             if (i != j) {
//                 adjacency[i][j] = 0
//             }
//         }
//     }
// }

const graphNodeNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

const rows = testMatrix1.length
const cols = testMatrix1[0].length

// const testMatrix1 = [[0, 5, 7, 0], [5, 0, 0, 6], [7, 0, 0, 2], [0, 6, 2, 0]]
// const graphNodeNames = ['A', 'B', 'C', 'D']

console.log("========== REPRESENTASI WEIGHTED ADJACENCY MATRIX ==========")
console.table(adjacency)

console.log(UCS(testMatrix1, 0, 9, graphNodeNames))