import {PriorityQueue, TreeNode} from './PriorityQueue.js'

/**
 * 
 * @param {*} matrix Weighted adjacency matrix
 * @param {*} start Index node awal pada matrix
 * @param {*} finish Index node akhir pada matrix
 */
function UCS(matrix, start, finish, nodeNames) {
    const prioqueue = new PriorityQueue()
    const nodeCount = matrix[0].length
    let expandNode = new TreeNode(null, nodeNames[start], null, 0)
    let expandNodeIdx = start
    do {
        for (let i = 0; i < nodeCount; i++) {
            const distance = matrix[expandNodeIdx][i]
            if (i !== expandNodeIdx && distance !== Infinity) {
                let name = nodeNames[i]
                let priority = expandNode.priority + distance
                const liveNode = new TreeNode(expandNode, name, null, priority)
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
                    [0, 6, -1, -1, -1, 3, -1, -1, -1, -1], 
                    [6, 0, 3, 2, -1, -1, -1, -1, -1, -1], 
                    [-1, 3, 0, 1, 5, -1, -1, -1, -1, -1],
                    [-1, 2, 1, 0, 8, -1, -1, -1, -1, -1],
                    [-1, -1, 5, 8, 0, -1, -1, -1, 5, 5], 
                    [3, -1, -1, -1, -1, 0, 1, 7, -1, -1],
                    [-1, -1, -1, -1, -1, 1, 0, -1, 3, -1],
                    [-1, -1, -1, -1, -1, 7, -1, 0, 2, -1],
                    [-1, -1, -1, -1, 5, -1, 3, 2, 0, 3], 
                    [-1, -1, -1, -1, 5, -1, -1, -1, 3, 0]
                ]

const graphNodeNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

const rows = testMatrix1.length
const cols = testMatrix1[0].length

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (testMatrix1[i][j] == -1) {
            testMatrix1[i][j] = Infinity
        }
    }
}

// const testMatrix1 = [[0, 5, 7, Infinity], [5, 0, Infinity, 6], [7, Infinity, 0, 2], [Infinity, 6, 2, 0]]
// const graphNodeNames = ['A', 'B', 'C', 'D']

console.log("========== REPRESENTASI WEIGHTED ADJACENCY MATRIX ==========")
console.table(testMatrix1)

console.log(UCS(testMatrix1, 0, 9, graphNodeNames))