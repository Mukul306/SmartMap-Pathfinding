class PriorityQueue {
  constructor() {
    this.queue = [];
  }
  
  enqueue(node) {
    this.queue.push(node);
    this.queue.sort((a, b) => a.priority - b.priority);
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

  updatePriority(node, priority) {
    const index = this.queue.indexOf(node);
    this.queue[index].priority = priority;
    this.queue.sort((a, b) => a.priority - b.priority);
  }
}

module.exports = PriorityQueue;