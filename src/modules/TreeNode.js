const {euclideanDistance, haversineDistance} = require('./GraphUtil.js')

class TreeNode {
    constructor(parent, id, name, location, distFromStart) {
        this.parent = parent
        this.id = id
        this.name = name
        this.location = location
        this.distFromStart = distFromStart
    }

    printInfo() {
        console.log(this.id, this.name, this.location)
    }

    getPathFromRoot() {
        const path = []
        let currentNode = this
        while (currentNode !== null) {
            path.unshift(currentNode.name)
            currentNode = currentNode.parent
        }
        return path
    }

    /**
     * @abstract
     * Node priority depends on implementation of search algorithm.
     ** UCS => priority = distance from start node
     ** A*  => priority = distance from start node + heuristic (distance approx from current node to goal node)
     */
    get priority() {}
}

class UCSTreeNode extends TreeNode {
    constructor(parent, id, name, location, distFromStart) {
        super(parent, id, name, location, distFromStart)
    }

    get priority() {
        return this.distFromStart
    }
}

class AstarTreeNode extends TreeNode {
    constructor(parent, id, name, location, distFromStart, goalLocation) {
        super(parent, id, name, location, distFromStart)
        this.goalLocation = goalLocation
    }

    get priority() {
        return this.distFromStart + euclideanDistance(this.location, this.goalLocation)
    }
}

module.exports = {TreeNode, UCSTreeNode, AstarTreeNode}