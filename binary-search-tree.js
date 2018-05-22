'use strict';

class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {  
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('Key Error');
    }
  }
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _findMax() {
    if (!this.right) {
      return this;
    }
    return this.right._findMax();
  }
}



function heightBST(BST) {
  if (BST === null) {
    return 0;
  } else if (!BST.left && !BST.right) {
    return 1;
  } else if (BST.left || BST.right) {
    // console.log(Math.max(heightBST(BST.left), heightBST(BST.right)) + 1);
    return Math.max(heightBST(BST.left), heightBST(BST.right)) + 1;
  }
}

// is it BST?
// Write an algorithm to check whether an arbitrary binary tree is a binary search tree, assuming the tree does not contain duplicates

//input: binary tree, output: boolean
//everything on left will be less than parent and everything on right will be greater than parent if true
//make bad binary tree output will be false

function isBST(node) {
  if(node.left) {
    if(node.left.key > node.key) {
      return false;
    }
    if(!isBST(node.left)){
      return false;
    }
  }
  if(node.right) {
    if(node.right.key < node.key) {
      return false;
    }
    if(!isBST(node.right)){
      return false;
    }
  }
  return true;
}

function isBST2(node, min, max) {
  // if (node === null) {
  //   return true;
  // }
  if (min !== undefined && node.key < min) {
    return false;
  }
  if (max !== undefined && node.key > max) {
    return false;
  }
  if (node.left && !isBST2(node.left, min, node.key)) {
    return false;
  }
  if (node.right && !isBST2(node.right, node.key, max)) {
    return false;
  }
  return true;
  // else if (node.key <= node.left || node.key >= node.right) {
  //   console.log(BST.key);
  //   return false
  // }
  // return isBST2(node.key, node.left) && isBST2(BST.key, BST.right);
}

//sork on this implementation later
function isBST3(node, min=Number.NEGATIVE_INFINITY, max=Number.POSITIVE_INFINITY) {
  if (!node) return true;
  if (node.key < min || node.key > max) {
    return false;
  }
  return (
    isBST3(node.left, min, node.key - 1) &&
    isBST3(node.right, node.key + 1, min)
  );
}


class BadBinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key > this.key) {  
      if (this.left == null) {
        this.left = new BadBinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BadBinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _findMax() {
    if (!this.right) {
      return this;
    }
    return this.right._findMax();
  }
}

// Third largest node
// Write an algorithm to find the third largest node in a binary search tree

//could we map and sort (high to low) node keys into and array and grab the arr[2] 
//could we traverse the right first keeping a count and when get to 3 return the value


function largest( tree, nth ) {
  if(tree.key == null)
    return null;
  var state = {n: nth, result:null};
  nth_largest(tree, state);
  return state.result;
}
//helper function
function nth_largest(tree, state) { 
  //Finding the largest node means traversing the right first.
  if (tree.right) {
    nth_largest(tree.right, state);
    if (state.result) return;
  }
  if (!--state.n) { 
    //Found it.
    state.result = tree.key; 
    return;
  }
  if (tree.left) nth_largest(tree.left, state);
}

//Below trying to use count to solve...only works for right side now
// function thirdLargest(node, count=1) {
//   if(node === null) {
//     return null;
//   }
//   //base case
//   if (count === 3) {
//     return node.key;
//   }
//   //general case
//   // if (node.right || node.left) {
//   return (
//     thirdLargest(node.right, count +1) || thirdLargest(node.left, count +1));
// }




function main() {
  let BST = new BinarySearchTree();
  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  // BST.insert(9);
  // BST.insert(2);
  // BST.insert(5);
  // BST.insert(7);
  // console.log(BST);
  // console.log(heightBST(BST));
  let BadBST = new BadBinarySearchTree();
  BadBST.insert(4, 4);
  BadBST.insert(3, 3);
  BadBST.insert(2, 2);
  BadBST.insert(7, 7);
  // console.log(BadBST);
  console.log(isBST(BST));
  console.log(isBST(BadBST));
  console.log(isBST2(BST, BST._findMin(), BST._findMax()));
  console.log(isBST2(BadBST));
  // console.log(isBST3(BST));
  // console.log(isBST3(BadBST));
  // console.log(thirdLargest(BST));
  console.log(largest( BST, 3 ));
}

main();

module.exports = BinarySearchTree;

// Create a BST class
// Walk through the Binary Search Tree code in the curriculum and understand it well. Then write a Binary Search Tree class and with its core functions (insert, remove, find) from scratch.

// Create a Binary Search Tree called BST and insert 3,1,4,6,9,2,5,7 to your tree. Compare your result with the result from the first exercise