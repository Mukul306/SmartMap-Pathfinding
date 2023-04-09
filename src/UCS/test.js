import {UCS} from './UCS.js'
import {Astar} from './Astar.js'


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
//     {id: 0, name: 'A', location: {lat: 3, lng: 4}},
//     {id: 1, name: 'B', location: {lat: 3, lng: 4}},
//     {id: 2, name: 'C', location: {lat: 3, lng: 4}},
//     {id: 3, name: 'D', location: {lat: 3, lng: 4}},
//     {id: 4, name: 'E', location: {lat: 3, lng: 4}},
//     {id: 5, name: 'F', location: {lat: 3, lng: 4}},
//     {id: 6, name: 'G', location: {lat: 3, lng: 4}},
//     {id: 7, name: 'H', location: {lat: 3, lng: 4}},
//     {id: 8, name: 'I', location: {lat: 3, lng: 4}},
//     {id: 9, name: 'J', location: {lat: 3, lng: 4}}
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
    {id: 0, name: 'A', location: {lat: 0, lng: 0}},
    {id: 1, name: 'B', location: {lat: 0, lng: 1}},
    {id: 2, name: 'C', location: {lat: 0, lng: 2}},
    {id: 3, name: 'D', location: {lat: 1, lng: 1}},
    {id: 4, name: 'E', location: {lat: 1, lng: 2}},
    {id: 5, name: 'F', location: {lat: 2, lng: 2}},
    {id: 6, name: 'G', location: {lat: 1, lng: 3}},
    {id: 7, name: 'H', location: {lat: 2, lng: 3}}
] 

console.log("========== REPRESENTASI GRAF DALAM WEIGHTED ADJACENCY MATRIX ==========")
console.table(testMatrix2)


console.log("\n UCS")
console.log(UCS(testMatrix2, 0, 6, nodesInfo2))
console.log("\Astar")
console.log(Astar(testMatrix2, 0, 6, nodesInfo2))
