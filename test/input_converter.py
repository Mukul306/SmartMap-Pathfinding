import json

# Convert a graph from a text file to a JSON file
def graph_to_json(input_file_path, output_file_path):
    # Read the input file
    with open(input_file_path, 'r') as input_file:
        edges = input_file.read().splitlines()
    
    # Extract all nodes from the edges
    nodes = list(set([node for edge in edges for node in edge.split()]))

    # Assign ids to each node
    node_dict = {node: i for i, node in enumerate(nodes)}

    # Create an adjacency matrix
    adj_matrix = [[0] * len(nodes) for _ in range(len(nodes))]
    for edge in edges:
        node_a, node_b = edge.split()
        adj_matrix[node_dict[node_a]][node_dict[node_b]] = 1
        adj_matrix[node_dict[node_b]][node_dict[node_a]] = 1

    # Convert to dictionary
    graph_dict = {
        "nodes": [{"id": i, "name": node} for node, i in node_dict.items()],
        "adjacency": adj_matrix
    }

    # Write to JSON file
    with open(output_file_path, 'w') as output_file:
        json.dump(graph_dict, output_file, indent=4)

    print("Conversion successful!")


# Sample usage
# Node1 Node2
# Node1 Node3
# Node2 Node3
# Node2 Node4

# Explanation:
# Node1 and Node2 are connected
# Node1 and Node3 are connected
# Node2 and Node3 are connected
# Node2 and Node4 are connected