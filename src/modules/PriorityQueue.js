class PriorityQueue {
    constructor() {
      this.list = [];
    }

    isEmpty() {
      return this.list.length == 0;
    }
    
    enqueue(elmt) {
      if (this.isEmpty()) {
        this.list.push(elmt);
      } else {
        let i = 0;
        const length = this.list.length;
        for (i; i < length; i++) {
          if (this.list[i].priority < elmt.priority) {
            break;
          }
        }
        this.list.splice(i, 0, elmt);
      }
    }

    dequeue() {
      return this.list.shift();
    }

    printAllInfo() {
      if (this.isEmpty()) {
        console.log("kosong...");
      } else {
        console.log("Queue elements: ");
        this.list.forEach(elmt => elmt.printInfo());
      }
    }
}
  
module.exports = PriorityQueue;