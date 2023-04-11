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
        console.log(this.id, this.name, this.location, this.priority)
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
     * A helper method to see if a node is already visited in this path to avoid going back and forth
     *  (mondar-mandir)
     * @param {int} nodeId 
     * @returns ans
     */
    isNodeAlreadyVisited(nodeId) {
        let currentNode = this
        while (currentNode !== null) {
            if (currentNode.id === nodeId) return true
            currentNode = currentNode.parent
        }
        return false
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
    constructor(parent, id, name, location, distFromStart, goalNode, heuristic) {
        super(parent, id, name, location, distFromStart)
        this.goalNode = goalNode
        this.heuristic = heuristic
    }

    get priority() {
        return this.distFromStart + this.heuristic(this, this.goalNode)
    }
}

module.exports = {TreeNode, UCSTreeNode, AstarTreeNode}