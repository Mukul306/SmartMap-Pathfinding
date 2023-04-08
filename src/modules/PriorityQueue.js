class PriorityQueue {
  constructor() {
    this.queue = [];
  }
  
  enqueue(node) {
    let added = false;
    
    for (let i = 0; i < this.queue.length; i++) {
      if (node.priority < this.queue[i].priority) {
        this.queue.splice(i, 0, node);
        added = true;
        break;
      }
    }
    
    if (!added) {
      this.queue.push(node);
    }
  }
  
  dequeue() {
    return this.queue.shift();
  }
  
  includes(node) {
    return this.queue.includes(node);
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  get length() {
    return this.queue.length;
  }
}

module.exports = PriorityQueue;