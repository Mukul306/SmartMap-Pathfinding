class PriorityQueue {
    constructor() {
        this.list = []
    }

    isEmpty() {
        return this.list.length == 0
    }

    enqueue(elmt) {
        const index = this.list.findIndex((item) => item.priority > elmt.priority);
        if (index === -1) {
            this.list.push(elmt);
        } 
        else {
            this.list.splice(index, 0, elmt);
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


module.exports = {PriorityQueue}