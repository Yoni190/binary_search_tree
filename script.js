class Node {
    constructor(value, left_node=null, right_node=null){
        this.value = value
        this.left_node = left_node
        this.right_node = right_node
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
tree.prettyPrint(tree.root)