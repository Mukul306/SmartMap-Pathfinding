const {UCS} = require('../UCS.js')
const {Astar} = require('../Astar.js')
const {euclideanDistance, haversineDistance} = require('../GraphUtil.js')

// TEST CASE 1
// taken from https://www.gatevidyalay.com/a-algorithm-a-algorithm-example-in-ai/ 
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

const nodesInfo1 = [
    {id: 0, name: 'A', location: null}, // In this testcase, heuristic values are given and don't depend on node location
    {id: 1, name: 'B', location: null},
    {id: 2, name: 'C', location: null},
    {id: 3, name: 'D', location: null},
    {id: 4, name: 'E', location: null},
    {id: 5, name: 'F', location: null},
    {id: 6, name: 'G', location: null},
    {id: 7, name: 'H', location: null},
    {id: 8, name: 'I', location: null},
    {id: 9, name: 'J', location: null}
]

function heuristic1(node1, node2) {
    const heuristicValues = [10, 8, 5, 7, 3, 6, 5, 3, 1, 0] // given that goal = J
    return heuristicValues[node1.id]
}

console.log("TEST CASE 1")
console.log("========== REPRESENTASI GRAF DALAM WEIGHTED ADJACENCY MATRIX ==========")
console.table(testMatrix1)

console.log("\n UCS")
console.log(UCS(testMatrix1, 0, 9, nodesInfo1))

console.log("\n A*")
console.log(Astar(testMatrix1, 0, 9, nodesInfo1, heuristic1))
console.log("\n\n")



// TEST CASE 2
/*
       2   4  
    A -- B -- C
      5 |   / 4
        |  /    7
        D -- E -- G
          3  |    | 2
             | 1  |
             F -- H
               1
*/
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

console.log("TEST CASE 2")
console.log("========== REPRESENTASI GRAF DALAM WEIGHTED ADJACENCY MATRIX ==========")
console.table(testMatrix2)

console.log("\n UCS")
console.log(UCS(testMatrix2, 0, 6, nodesInfo2))

console.log("\n A*")
console.log(Astar(testMatrix2, 0, 6, nodesInfo2, euclideanDistance))
console.log("\n\n")



// TEST CASE 3 (map of romania)
// taken from https://web.cs.hacettepe.edu.tr/~ilyas/Courses/VBM688/lec04_informedsearch%20.pdf 
// matrix from https://github.com/TheCodingGent/UninformedSearches/blob/master/src/UninformedSearches.java 


const romania = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
// Every city is assigned an integer
const ORADEA = 0;
const ZERIND = 1;
const ARAD = 2;
const TIMISORA = 3;
const LUGOJ = 4;
const MEHADIA = 5;
const DROBETA = 6;
const CRAIOVA = 7;
const RIMNICU_VILCEA = 8;
const SIBIU = 9;
const FAGARAS = 10;
const PITESTI = 11;
const BUCHAREST = 12;
const GIURGIU = 13;
const URZICENI = 14;
const VASLUI = 15;
const IASI = 16;
const NEAMT = 17;
const HIRSOVA = 18;
const EFORIE = 19;

romania[ORADEA][ZERIND] = 71;
romania[ORADEA][SIBIU] = 151;
romania[ZERIND][ORADEA] = 71;
romania[ZERIND][ARAD] = 75;
romania[ARAD][ZERIND] = 75;
romania[ARAD][SIBIU] = 140;
romania[ARAD][TIMISORA] = 118;
romania[TIMISORA][ARAD] = 118;
romania[TIMISORA][LUGOJ] = 111;
romania[LUGOJ][TIMISORA] = 111;
romania[LUGOJ][MEHADIA] = 70;
romania[MEHADIA][LUGOJ] = 70;
romania[MEHADIA][DROBETA] = 75;
romania[DROBETA][MEHADIA] = 75;
romania[DROBETA][CRAIOVA] = 120;
romania[CRAIOVA][RIMNICU_VILCEA] = 146;
romania[CRAIOVA][DROBETA] = 120;
romania[CRAIOVA][PITESTI] = 138;
romania[RIMNICU_VILCEA][SIBIU] = 80;
romania[RIMNICU_VILCEA][PITESTI] = 97;
romania[RIMNICU_VILCEA][CRAIOVA] = 146;
romania[SIBIU][ORADEA] = 151;
romania[SIBIU][ARAD] = 140;
romania[SIBIU][FAGARAS] = 99;
romania[SIBIU][RIMNICU_VILCEA] = 80;
romania[FAGARAS][SIBIU] = 99;
romania[FAGARAS][BUCHAREST] = 211;
romania[PITESTI][RIMNICU_VILCEA] = 87;
romania[PITESTI][CRAIOVA] = 138;
romania[PITESTI][BUCHAREST] = 101;
romania[BUCHAREST][PITESTI] = 101;
romania[BUCHAREST][FAGARAS] = 211;
romania[BUCHAREST][GIURGIU] = 90;
romania[BUCHAREST][URZICENI] = 85;
romania[GIURGIU][BUCHAREST] = 90;
romania[URZICENI][BUCHAREST] = 85;
romania[URZICENI][VASLUI] = 142;
romania[URZICENI][HIRSOVA] = 98;
romania[VASLUI][IASI] = 92;
romania[VASLUI][URZICENI] = 142;
romania[IASI][NEAMT] = 87;
romania[IASI][VASLUI] = 92;
romania[NEAMT][IASI] = 87;
romania[HIRSOVA][URZICENI] = 98;
romania[HIRSOVA][EFORIE] = 86;
romania[EFORIE][HIRSOVA] = 86;

const nodesInfoRomania = [ // In this testcase, heuristic values are given and don't depend on node location
    {id: 0, name: 'ORADEA', location: null}, 
    {id: 1, name: 'ZERIND', location: null},
    {id: 2, name: 'ARAD', location: null},
    {id: 3, name: 'TIMISORA', location: null},
    {id: 4, name: 'LUGOJ', location: null},
    {id: 5, name: 'MEHADIA', location: null},
    {id: 6, name: 'DROBETA', location: null},
    {id: 7, name: 'CRAIOVA', location: null},
    {id: 8, name: 'RIMINICU_VILCEA', location: null},
    {id: 9, name: 'SIBIU', location: null},
    {id: 10, name: 'FAGARAS', location: null}, 
    {id: 11, name: 'PITESTI', location: null},
    {id: 12, name: 'BUCHAREST', location: null},
    {id: 13, name: 'GIURGIU', location: null},
    {id: 14, name: 'URZICENI', location: null},
    {id: 15, name: 'VASLUI', location: null},
    {id: 16, name: 'IASI', location: null},
    {id: 17, name: 'NEAMT', location: null},
    {id: 18, name: 'HIRSOVA', location: null},
    {id: 19, name: 'EFORIE', location: null},
]

function straightLineToBucharest(node1, node2) {
    const values = [380, 374, 366, 329, 244, 241, 242, 160, 193, 253, 176, 100, 0, 77, 80, 199, 226, 234, 151, 161]
    return values[node1.id]
} 


console.log("TEST CASE 3")
console.log("========== REPRESENTASI GRAF DALAM WEIGHTED ADJACENCY MATRIX ==========")
console.table(romania)

console.log("\n UCS")
console.log(UCS(romania, ARAD, BUCHAREST, nodesInfoRomania))

console.log("\n A*")
console.log(Astar(romania, ARAD, BUCHAREST, nodesInfoRomania, straightLineToBucharest))


