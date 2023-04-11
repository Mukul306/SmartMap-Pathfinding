const {TreeNode, UCSTreeNode, AstarTreeNode} = require("../TreeNode")
const {PriorityQueue} = require('../PriorityQueue.js')

// TESTING PRIORITY QUEUE AND TREE NODE

// Node construction
const node1 = new UCSTreeNode(null, 1, "a", {x: 4.4, y: 5.5}, 10)
const node2 = new UCSTreeNode(node1, 2, "b", {x: 6.1, y: 9.7}, 2)
const node3 = new UCSTreeNode(node1, 3, "c", {x: 6.1, y: 9.7}, 7)
const node4 = new UCSTreeNode(node2, 4, "d", {x: 6.1, y: 9.7}, 1)
const nodeHello = new AstarTreeNode(null, 100, "hello", {x: 20, y: 0}, 43, {x: 44, y: 1})

console.log("Node a & node hello info: ")
node1.printInfo()
nodeHello.printInfo()
console.log("node hello goal location = x: " + nodeHello.goalLocation.x + " y: " + nodeHello.goalLocation.y)
console.log("\n\n")

console.log("========== PRIORITY TEST ==========")
console.log("Node a priority = " + node1.priority)
console.log("Node hello priority = " + nodeHello.priority) // = 43 + euclideanDistance({20, 0}, {44, 1})
console.log("\n\n")

// Queue operations
console.log("========== QUEUE OPERATION TEST ==========")
const prioqueue = new PriorityQueue()
prioqueue.printAllInfo()
prioqueue.enqueue(node1)
prioqueue.enqueue(node2)
prioqueue.enqueue(node3)
prioqueue.enqueue(node4)
prioqueue.printAllInfo()
prioqueue.dequeue()
prioqueue.dequeue()
prioqueue.printAllInfo()
prioqueue.dequeue()
prioqueue.dequeue()

const undef = prioqueue.dequeue() // expected to return undefined since queue is empty
console.log(undef)

prioqueue.printAllInfo()
console.log("\n\n")

// Node chaining test (see if node works as linked list)
const node5 = new TreeNode(node4, 5, "e", null, 4)
const node6 = new TreeNode(node5, 6, "f", null, 9)
const node7 = new TreeNode(node6, 7, "g", null, 6)
console.log("========== NODE CHAINING TEST ==========")
console.log(node7.getPathFromRoot()) // expect: a, b, d, e, f, g