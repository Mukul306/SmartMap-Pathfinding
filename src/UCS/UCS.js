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
            if (i !== expandNodeIdx && distance !== Infinity) {
                let name = nodeNames[i]
                let distFromStart = expandNode.distFromStart + distance
                const liveNode = new TreeNode(expandNode, name, null, distFromStart)
                prioqueue.enqueue(liveNode)
            }
        }

        expandNode = prioqueue.dequeue()
        expandNodeIdx = nodeNames.indexOf(expandNode.name)
    }
    while (expandNode.name !== nodeNames[finish] && !prioqueue.isEmpty())
    
    const routeList = []
    let routeNode = expandNode
    while (routeNode != null) {
        routeList.unshift(routeNode.name)
        routeNode = routeNode.parent
    }

    return routeList
}


const testMatrix1 = [
                    [0, 6, Infinity, Infinity, Infinity, 3, Infinity, Infinity, Infinity, Infinity], 
                    [6, 0, 3, 2, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], 
                    [Infinity, 3, 0, 1, 5, Infinity, Infinity, Infinity, Infinity, Infinity],
                    [Infinity, 2, 1, 0, 8, Infinity, Infinity, Infinity, Infinity, Infinity],
                    [Infinity, Infinity, 5, 8, 0, Infinity, Infinity, Infinity, 5, 5], 
                    [3, Infinity, Infinity, Infinity, Infinity, 0, 1, 7, Infinity, Infinity],
                    [Infinity, Infinity, Infinity, Infinity, Infinity, 1, 0, Infinity, 3, Infinity],
                    [Infinity, Infinity, Infinity, Infinity, Infinity, 7, Infinity, 0, 2, Infinity],
                    [Infinity, Infinity, Infinity, Infinity, 5, Infinity, 3, 2, 0, 3], 
                    [Infinity, Infinity, Infinity, Infinity, 5, Infinity, Infinity, Infinity, 3, 0]
                ]

const graphNodeNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

const rows = testMatrix1.length
const cols = testMatrix1[0].length

// const testMatrix1 = [[0, 5, 7, Infinity], [5, 0, Infinity, 6], [7, Infinity, 0, 2], [Infinity, 6, 2, 0]]
// const graphNodeNames = ['A', 'B', 'C', 'D']

console.log("========== REPRESENTASI WEIGHTED ADJACENCY MATRIX ==========")
console.table(testMatrix1)

console.log(UCS(testMatrix1, 3, 9, graphNodeNames))