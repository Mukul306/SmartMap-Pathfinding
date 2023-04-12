# Algorithm Strategies Course Project
## Path Finding with UCS and A-Star Algorithm

<img width="840" alt="image" src="https://user-images.githubusercontent.com/103266159/231497418-2b492062-cd98-481c-bb6e-6c6d52a31a96.png">

## Description
This application aims to find the nearest path between two location in a map. 

## Getting Started
To use this program, you need to have the following installed on your system:
1. Visual Studio Code
2. Live server extension in vscode

Make sure you have internet conneciton to run the program

## How to Run
To run the program, follow these steps:
1. Install the prerequisites
2. Clone or download the repository to your local machine
3. Create an input file in JSON format and place it in `/test` folder. Here's a sample of a valid input file.
```
{
    "nodes": [
      {
        "id": 0,
        "name": "Gerbang Utama ITB",
        "location": {
            "lat": -6.893141563096119,
            "long": 107.61045955255435
        }
      },
      {
        "id": 1,
        "name": "Gerbang Sipil ITB",
        "location": {
            "lat": -6.893692521627452,
            "long": 107.60847090893053
        }
      },
      {
        "id": 2,
        "name": "Taman Sari",
        "location": {
            "lat": -6.887861511364462,
            "long": 107.60823967129984
        }
      },
      {
        "id": 3,
        "name": "Dayang Sumbi",
        "location": {
            "lat": -6.887402373652822,
            "long": 107.6135812605685
        }
      },
      {
        "id": 4,
        "name": "Simpang Dago",
        "location": {
            "lat": -6.88525272657153,
            "long": 107.6136453838138
        }
      },
      {
        "id": 5,
        "name": "Jl. Djuanda",
        "location": {
            "lat": -6.893745574703283, 
            "long": 107.61297519726801
        }
      },
      {
        "id": 6,
        "name": "Simpang Teuku Umar",
        "location": {
            "lat": -6.891520, 
            "long": 107.613316
        }
      },
      {
        "id": 7,
        "name": "Jl. Dipati Ukur",
        "location": {
            "lat": -6.892398, 
            "long": 107.617873
        }
      }

    ],
    "weighted": false,
    "adjacency": [
      [0, 1, 0, 0, 0, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 0, 1, 0, 1, 0]
    ]
  }
```
<<<<<<< HEAD
NOTES:
* if `"weighted" == false`: 
  * if `adjacency[i][j] == 0` then there's no edge between node i and node j
  * if `adjacency[i][j] == 1` then there is an edge between node i and node j
  * `adjacency` elements can only be either 0 or 1
* if `"weighted" == true`:
  * if `adjacency[i][j] == 0` then there's no edge between node i and node j
  * if `adjacency[i][j] > 0` than it's the distance between node i and node j
  * `adjacency` elements can only be >= 0

4. Open `index.html` located in  `/public` with Visual Studio Code
5. Click Go Live in the bottom right corner in Visual Studio Code
6. Click choose file to insert the JSON input file
7. Select algorithm, start node and end node
8. Click start search
9. The graph will be shown in the map and the path will be colored green
10. The path and the total cost will be revealed below the end node

## Project Structure
```
│   LICENSE
│   README.md
│   
├───public
│       index.html
│       
├───src
│   │   script.js
│   │   
│   └───modules
│           Astar.js
│           GraphUtil.js
│           PriorityQueue.js
│           TreeNode.js
│           UCS.js
│
├───style
│       style.css
│       
└───test
    │   input_converter.py
    │   
    ├───test_case
    │   ├───invalid_cases
    │   │       invalidID.json
    │   │       invalidLocation.json
    │   │       noAdjacency.json
    │   │       singleNode.json
    │   │       syntaxError.json
    │   │
    │   └───valid_cases
    │           ITB.json
    │           Romania.json
    │           USA.json
    │
    └───unit_testing
            Queue_Node.js
            UCS_Astar.js
```

## Implementation Details
In both algorithm, the program starts by visiting the starting node and expanding all of its neighbors.
All of the expanded nodes will be put into a priority queue then the elements of the priority queue will be dequeued one by one and expanded until an optimal path is found. The main difference between UCS (Uniform Cost Search) and A* (A star) is that the elements of the priority queue in UCS are sorted by their distance from starting node, while in A* they are sorted by their distance from starting node + estimate distance to goal node.

## Author
- [Enrique Alifio Ditya - 13521142](https://github.com/AlifioDitya) 
- [Haziq Abiyyu Mahdy - 13521170](https://github.com/haziqam) 

## Made With
HTML, CSS, JS