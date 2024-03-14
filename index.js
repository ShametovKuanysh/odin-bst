class Node {
    value
    left
    right
    constructor(value, left = null, right = null) {
        this.value = value
        this.left = left
        this.right = right
    }
}

class Tree {
    root
    constructor(root){
        this.root = root
    }

    find = (value, node = this.root) => {
        if (node){
            if (node.value == value) return node
            else if (node.value > value) return this.find(value, node.left)
            else return this.find(value, node.right)
        } 

        return null
    }

    insert = (value, node = this.root) => {
        if (node.value <= value) {
            if (node.right){
                this.insert(value, node.right)
            } else {
                node.right = new Node(value)
            }
        } else {
            if (node.left){
                this.insert(value, node.left)
            } else {
                node.left = new Node(value)
            }
        }
    }

    delete = (value, node = this.root) => {
        if (node.value == value){
            if (!node.left && !node.right) {
                return null
            } else if (!node.left){
                return node.right
            } else if (!node.right){
                return node.left
            } else {
                let succParent = node;
 
                let succ = node.right;
                while (succ.left !== null) {
                    succParent = succ;
                    succ = succ.left;
                }
                
                console.log(succ)
                console.log(succParent)
                console.log(node)

                if (succParent !== node) {
                    succParent.left = succ.right;
                } else {
                    succParent.right = succ.right;
                }
            
                node.value = succ.value;
            
                return node;
            }
        } else if (node.value > value) {
            node.left = this.delete(value, node.left)
            return node
        } else {
            node.right = this.delete(value, node.right)
            return node
        }
    }

    levelOrderIter = (callback) => {
        const res = []
        const queue = []
        queue.push(this.root)

        while (queue.length > 0){
            res.push(queue[0].value)

            if (queue[0].left){
                queue.push(queue[0].left)
            }
            if (queue[0].right){
                queue.push(queue[0].right)
            }
            queue.shift()
        }
        return callback ? res.map(callback) : res
    }

    preOrder = (node = this.root, callback) => {
        const res = []

        res.push(node.value)
        if (node.left){
            res.push(...this.preOrder(node.left))
        }
        if (node.right){
            res.push(...this.preOrder(node.right))
        }

        return callback ? res.map(callback) : res
    }

    inOrder = (node = this.root, callback) => {
        const res = []

        if (node.left){
            res.push(...this.inOrder(node.left))
        }
        res.push(node.value)
        if (node.right){
            res.push(...this.inOrder(node.right))
        }

        return callback ? res.map(callback) : res
    }

    postOrder = (node = this.root, callback) => {
        const res = []
        if (node === null) {return}

        if (node.left){
            res.push(...this.postOrder(node.left))
        }
        if (node.right){
            res.push(...this.postOrder(node.right))
        }
        res.push(node.value)

        return callback ? res.map(callback) : res
    }

    

    height = (node) => {
        if (!this.root) return -1
        if (!node) return -1;

        let left = this.height(node.left)
        let right = this.height(node.right)
        return Math.max(left, right) + 1
    }

    depth = (node, root = this.root, count = 0) => {
        if (node.value == root.value){
            return count
        } else if (node.value < root.value){
            if (root.left){
                return this.depth(node, root.left, ++count)
            }
            return null
        } else {
            if (root.right){
                return this.depth(node, root.right, ++count)
            }
            return null
        }
    }

    isBalanced = () => {
        if (!this.root) return true
        let left = this.height(this.root.left)
        let right = this.height(this.root.right)
    
        return Math.max(left, right) - Math.min(left, right) <= 1
    }

    rebalance = () => {
        const arr = this.inOrder(this.root)

        this.root = buildTree(arr)
    }
}

function buildTree(arr){
    if (arr.length == 0){
        return null
    }

    let half = Math.floor(arr.length / 2)

    let root = new Node(arr[half])
    root.left = buildTree(arr.slice(0, half))
    root.right = buildTree(arr.slice(half + 1))

    return root
}

function prettyPrint(node, prefix = "", isLeft = true){
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

mergeSort = (arr) => {
    if (arr.length == 1) return arr
    else {
        let half = Math.floor(arr.length / 2)

        let left = mergeSort(arr.slice(0, half))
        let right = mergeSort(arr.slice(half))
    
        return merge(left, right)
    }
}

merge = (left, right) => {
    const res = []
    while (left.length && right.length){
        if (left[0] < right[0]){
            res.push(left.shift())
        } else {
            res.push(right.shift())
        }
    }

    return [...res, ...left, ...right]
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const uq = testArray.filter((value, index, array) => array.indexOf(value) === index)
const sorted = mergeSort(uq)

// const sorted = [4,2,5,1,x/6,3,7]


function driver(size){
    let arr = []
    for (let i = 0; i < size; i++){
        arr.push(Math.floor(Math.random() * 100))
    }
    arr = arr.filter((value, index, array) => array.indexOf(value) === index)
    return mergeSort(arr)
}



let tree = new Tree(buildTree(driver(20)))
console.log(prettyPrint(tree.root))
console.log("Balanced: ", tree.isBalanced())
console.log("Level: ", tree.levelOrderIter())
console.log("Inorder: ", tree.inOrder())
console.log("Preorder: ", tree.preOrder())
console.log("Postorder: ", tree.postOrder())
tree.insert(120)
tree.insert(130)
tree.insert(140)
tree.insert(150)
console.log("Added 120, 130, 140, 150")
console.log("Balanced: ", tree.isBalanced())
console.log(prettyPrint(tree.root))
tree.rebalance()
console.log("After rebalanced: ", tree.isBalanced())
console.log("Level: ", tree.levelOrderIter())
console.log("Inorder: ", tree.inOrder())
console.log("Preorder: ", tree.preOrder())
console.log("Postorder: ", tree.postOrder())
console.log(prettyPrint(tree.root))




