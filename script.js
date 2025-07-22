class Node {
    constructor(value, left=null, right=null){
        this.value = value
        this.left = left
        this.right = right
    }
}


class Tree {
    
    constructor(array) {
        this.array = array
        this.root = this.buildTree(array, 0, array.length - 1)
    }


    buildTree(array, start, end){
        if (start > end) return null
        

        const mid = start + Math.floor((end - start) / 2)
        
        const root = new Node(array[mid])

        root.left = this.buildTree(array, start, mid - 1)
        root.right = this.buildTree(array, mid+1, end)

        return root
    }

    insert(value, root=this.root) {
        if(root === null){
            return new Node(value)
        }

        if(root.value === value) {
            return root
        }

        if(value < root.value){
            root.left = this.insert(value, root.left)
        } else if(value > root.value) {
            root.right = this.insert(value, root.right)
        }

        return root
    }

     getSuccessor(curr) {
            curr = curr.right;
            while (curr !== null && curr.left !== null) {
                curr = curr.left;
            }
            return curr;
        }

    deleteItem(value, root=this.root) {
        if(root === null){
            return root
        }

        if(value < root.value){
            root.left = this.deleteItem(value, root.left)
        } else if(value > root.value) {
            root.right = this.deleteItem(value, root.right)
        } else {
            if (root.left === null) 
            return root.right;

        if (root.right === null) 
            return root.left;

        let succ = this.getSuccessor(root);
        root.value = succ.value;
        root.right = this.deleteItem(succ.value, root.right);
        }

        return root
    }

    find(value, root=this.root){
        if (root.value === value) return root

        if(root.value < value) {
            return this.find(value, root.right)
        } else if(root.value > value) {
            return this.find(value, root.left)
        }
    }

    levelOrderForEach(callback) {
        if(typeof callback !== 'function'){
            throw new Error('A callback is required')
        }

        const queue = []
        if(this.root) queue.push(this.root)
        
        while(queue.length > 0){
            const current = queue.shift()
            callback(current)

            if(current.left) queue.push(current.left)
            if(current.right) queue.push(current.right)
        }
    }

    inorderForEach(callback, node = this.root) {
        if(typeof callback !== 'function'){
            throw new Error('A callback is required')
        }

        if (!node) return;
        
        this.inorderForEach(callback, node.left);  // left subtree
        callback(node);                            // visit node
        this.inorderForEach(callback, node.right); // right subtree
    }

    preOrderForEach(callback, node=this.root) {
        if(typeof callback !== 'function'){
            throw new Error('A callback is required')
        }

        if(!node) return;

        callback(node);
        this.preOrderForEach(callback, node.left)
        this.preOrderForEach(callback, node.right)
    }

    postOrderForEach(callback, node=this.root) {
        if(typeof callback !== 'function'){
            throw new Error('A callback is required')
        }
        
        if(!node) return;

        this.postOrderForEach(callback, node.left)
        this.postOrderForEach(callback, node.right)
        callback(node);
    }

    height(value, node = this.root, finding = true) {
        if (!node) return -1;

        if (finding) {
            // Search for the node with the given value
            if (node.value === value) {
                // Found the node, now calculate height of this subtree
                return this.height(value, node, false);
            }
            const leftSearch = this.height(value, node.left, true);
            if (leftSearch !== -1) return leftSearch;
            return this.height(value, node.right, true);
        } else {
            // calculating height (finding == false)
            const leftHeight = this.height(value, node.left, false);
            const rightHeight = this.height(value, node.right, false);
            return Math.max(leftHeight, rightHeight) + 1;
        }
    }

    depth(value, node = this.root, currentDepth = 0) {
        if (!node) return -1; // Node not found

        if (node.value === value) {
            return currentDepth;
        }

        // Search left subtree
        const left = this.depth(value, node.left, currentDepth + 1);
        if (left !== -1) return left;

        // Search right subtree
        return this.depth(value, node.right, currentDepth + 1);
    }

    isBalanced(node = this.root) {
        const check = (node) => {
            if (!node) return 0; // height of empty subtree is 0

            const left = check(node.left);
            if (left === -1) return -1; // left subtree unbalanced

            const right = check(node.right);
            if (right === -1) return -1; // right subtree unbalanced

            if (Math.abs(left - right) > 1) return -1; // current node unbalanced

            return Math.max(left, right) + 1; // return height if balanced
        };

        return check(node) !== -1;
    }



    rebalance() {
        const values = [];

        // Step 1: collect all values using inorder traversal
        this.inorderForEach(node => values.push(node.value));

        // Step 2: rebuild balanced tree
        this.root = this.buildTree(values, 0, values.length - 1);
    }


    prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };



}

const array = [1,2,3,4,5,6,7]
const tree = new Tree(array)

tree.insert(8)
tree.insert(9)
tree.insert(10)
console.log(tree.isBalanced())

tree.prettyPrint(tree.root);

tree.rebalance()

console.log(tree.isBalanced())

tree.prettyPrint(tree.root);
