class PriorityQueue {
    constructor() {
        this.list = []
    }

    isEmpty() {
        return this.list.length == 0
    }

    enqueue(elmt) {
        if (this.isEmpty()) {
            this.list.push(elmt)
        }
        else {
            let i = 0
            const length = this.list.length
            for (i; i < length; i++) {
                if (this.list[i].priority < elmt.priority) {
                    break
                }
            }
            this.list.splice(i, 0, elmt)
        }
    }

    dequeue() {
        return this.list.shift()
    }

    printAllInfo() {
        if (this.isEmpty()) {
            console.log("kosong...")
        }
        else {
            console.log("Queue elements: ")
            this.list.forEach(elmt => elmt.printInfo())
        }
    }
}

class TreeNode {
    constructor(parent, name, location, priority) {
        this.parent = parent
        this.name = name
        this.location = location
        this.priority = priority
    }

    printInfo() {
        console.log(this.name, this.location, this.priority)
    }
}

// Test
node1 = new TreeNode(null, "a", {x: 4.4, y: 5.5}, 10)
node2 = new TreeNode(node1, "b", {x: 6.1, y: 9.7}, 2)
node3 = new TreeNode(node1, "c", {x: 6.1, y: 9.7}, 7)
node4 = new TreeNode(node2, "d", {x: 6.1, y: 9.7}, 1)

prioqueue = new PriorityQueue()
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
prioqueue.printAllInfo()

