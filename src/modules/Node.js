class Node {
  constructor(id, parent, position, neighbours = [], priority = 0) {
    this.id = id;
    this.parent = parent;
    this.position = position;
    this.priority = priority;
    this.neighbours = neighbours;
  }

  // Print the information of this node
  printInfo() {
    console.log(this.id, this.location, this.priority);
  }
}
  
module.exports = Node;  