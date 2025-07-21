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

tree.insert(10)
tree.insert(8)
tree.insert(9)
tree.insert(11)

tree.deleteItem(10)
tree.deleteItem(4)
tree.prettyPrint(tree.root);