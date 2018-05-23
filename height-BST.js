'use strict';

const BinarySearchTree = require('./binary-search-tree');

// Height of a BST
// Write an algorithm to find the height of a binary search tree. What is the run time of your algorithm?

//height will equal level + 1
//start at root node if no root node height = 0; if no children height = 1
//else traverse left keep current count until left & right are null (store as max count)
//go back up until we reach parent node with right branch then traverse down the left and track current count until all null (compare to max count)

function heightBST(BST) {
  if (BST === null) {
    return 0;
  } else if (!BST.left && !BST.right) {
    return 1;
  } else if (BST.left || BST.right) {
    return Math.max(heightBST(BST.left), heightBST(BST.right)) + 1;
  }
}

console.log(heightBST(BST));
