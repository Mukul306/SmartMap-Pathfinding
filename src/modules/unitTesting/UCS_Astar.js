const {UCS} = require('../UCS.js')
const {Astar} = require('../Astar.js')


// const testMatrix1 = [
//     [0, 6, 0, 0, 0, 3, 0, 0, 0, 0], 
//     [6, 0, 3, 2, 0, 0, 0, 0, 0, 0], 
//     [0, 3, 0, 1, 5, 0, 0, 0, 0, 0],
//     [0, 2, 1, 0, 8, 0, 0, 0, 0, 0],
//     [0, 0, 5, 8, 0, 0, 0, 0, 5, 5], 
//     [3, 0, 0, 0, 0, 0, 1, 7, 0, 0],
//     [0, 0, 0, 0, 0, 1, 0, 0, 3, 0],
//     [0, 0, 0, 0, 0, 7, 0, 0, 2, 0],
//     [0, 0, 0, 0, 5, 0, 3, 2, 0, 3], 
//     [0, 0, 0, 0, 5, 0, 0, 0, 3, 0]
// ]

// const nodesInfo1 = [
//     {id: 0, name: 'A', location: {x: 3, y: 4}},
//     {id: 1, name: 'B', location: {x: 3, y: 4}},
//     {id: 2, name: 'C', location: {x: 3, y: 4}},
//     {id: 3, name: 'D', location: {x: 3, y: 4}},
//     {id: 4, name: 'E', location: {x: 3, y: 4}},
//     {id: 5, name: 'F', location: {x: 3, y: 4}},
//     {id: 6, name: 'G', location: {x: 3, y: 4}},
//     {id: 7, name: 'H', location: {x: 3, y: 4}},
//     {id: 8, name: 'I', location: {x: 3, y: 4}},
//     {id: 9, name: 'J', location: {x: 3, y: 4}}
// ]

// console.log(UCS(testMatrix1, 0, 6, nodesInfo1))

const testMatrix2 = [
    [0, 2, 0, 0, 0, 0, 0, 0],
    [2, 0, 4, 5, 0, 0, 0, 0],
    [0, 4, 0, 4, 0, 0, 0, 0],
    [0, 5, 4, 0, 3, 0, 0, 0],
    [0, 0, 0, 3, 0, 1, 7, 0],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 7, 0, 0, 2],
    [0, 0, 0, 0, 0, 1, 2, 0]
]

const nodesInfo2 = [
    {id: 0, name: 'A', location: {x: 0, y: 0}},
    {id: 1, name: 'B', location: {x: 0, y: 1}},
    {id: 2, name: 'C', location: {x: 0, y: 2}},
    {id: 3, name: 'D', location: {x: 1, y: 1}},
    {id: 4, name: 'E', location: {x: 1, y: 2}},
    {id: 5, name: 'F', location: {x: 2, y: 2}},
    {id: 6, name: 'G', location: {x: 1, y: 3}},
    {id: 7, name: 'H', location: {x: 2, y: 3}}
] 

console.log("========== REPRESENTASI GRAF DALAM WEIGHTED ADJACENCY MATRIX ==========")
console.table(testMatrix2)


console.log("\n UCS")
console.log(UCS(testMatrix2, 0, 6, nodesInfo2))

console.log("\Astar")
console.log(Astar(testMatrix2, 0, 6, nodesInfo2))


