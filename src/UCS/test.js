import {UCS} from './UCS.js'


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

const nodesInfo = [
    {id: 0, name: 'A', location: {lat: 3, lng: 4}},
    {id: 1, name: 'B', location: {lat: 3, lng: 4}},
    {id: 2, name: 'C', location: {lat: 3, lng: 4}},
    {id: 3, name: 'D', location: {lat: 3, lng: 4}},
    {id: 4, name: 'E', location: {lat: 3, lng: 4}},
    {id: 5, name: 'F', location: {lat: 3, lng: 4}},
    {id: 6, name: 'G', location: {lat: 3, lng: 4}},
    {id: 7, name: 'H', location: {lat: 3, lng: 4}},
    {id: 8, name: 'I', location: {lat: 3, lng: 4}},
    {id: 9, name: 'J', location: {lat: 3, lng: 4}},
]

console.log(UCS(testMatrix1, 0, 6, nodesInfo))

// // const adjacency = [
// //     [0, 2, 0, 0, 0, 0, 0, 0],
// //     [2, 0, 4, 5, 0, 0, 0, 0],
// //     [0, 4, 0, 4, 0, 0, 0, 0],
// //     [0, 5, 4, 0, 3, 0, 0, 0],
// //     [0, 0, 0, 3, 0, 1, 7, 0],
// //     [0, 0, 0, 0, 1, 0, 0, 1],
// //     [0, 0, 0, 0, 7, 0, 0, 2],
// //     [0, 0, 0, 0, 0, 1, 2, 0]
// // ]

// // for (let i = 0; i < 8; i++) {
// //     for (let j = 0; j < 8; j++) {
// //         if (adjacency[i][j] == 0) {
// //             if (i != j) {
// //                 adjacency[i][j] = 0
// //             }
// //         }
// //     }
// // }

// const graphNodeNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

// // const testMatrix1 = [[0, 5, 7, 0], [5, 0, 0, 6], [7, 0, 0, 2], [0, 6, 2, 0]]
// // const graphNodeNames = ['A', 'B', 'C', 'D']

// console.log("========== REPRESENTASI WEIGHTED ADJACENCY MATRIX ==========")
// console.table(testMatrix1)

// console.log(UCS(testMatrix1, 0, 6, graphNodeNames))

// let testarr = [{a: 1, b: 2}, {a: 3, b: 4}]
// console.log(testarr.find(elmt => elmt.a == 1))