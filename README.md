# binary_search_tree

This project is a complete implementation of a **Binary Search Tree** (BST) in JavaScript, featuring:

- Tree construction from a sorted array
- Insert, delete, and find operations
- Tree traversals (inorder, preorder, postorder, level order)
- Utility functions: height, depth, isBalanced, pretty print
- Rebalancing an unbalanced tree

---

## 🌳 Features

### ✅ Core Operations
- **insert(value)** – Insert a value while maintaining BST rules
- **deleteItem(value)** – Remove a value using standard BST deletion logic
- **find(value)** – Find and return the node with the given value

### 🔍 Tree Utilities
- **height(value)** – Get the height of the node with the given value
- **depth(value)** – Get the depth of the node with the given value
- **isBalanced()** – Check whether the tree is height-balanced
- **rebalance()** – Rebuild the tree to become balanced again

### 🔁 Traversals
- **inorderForEach(callback)** – Left → Root → Right
- **preOrderForEach(callback)** – Root → Left → Right
- **postOrderForEach(callback)** – Left → Right → Root
- **levelOrderForEach(callback)** – Breadth-first level-by-level traversal

### 🖼 Pretty Print
- **prettyPrint()** – Prints the tree structure in a readable format in the console
