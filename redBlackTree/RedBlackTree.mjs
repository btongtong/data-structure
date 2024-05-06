// 공통
// rotateLeft(node)
// rotateRight(node)
// replaceParentsChild(parent, oldChild, newChild)
// 삽입
// insert(data)
// rebalanceAfterInsertion(node)
// getUncle(parent)
// 제거
// remove(data)
// removeWithZeroOrOneChild(node)
// getBiggestNode(node)
// rebalanceAfterDeletion(node)
// getSibling(node)
// handleRedSibling(node, sibling)
// isBlack(node)
// handleBlackSiblingWithAtLeastOneRedChild(node, sibling)

import { BinaryTree, RED, BLACK } from "./BinaryTree.mjs";

class RedBlackTree{
    constructor(rootNode = null) {
        this.root = rootNode;
    }

    search(targetData) {
        let currentNode = this.root;

        while(currentNode != null) {
            if(currentNode.getData() == targetData) {
                return currentNode;
            } else if(currentNode.getData() > targetData) {
                currentNode = currentNode.getLeftSubTree();
            } else {
                currentNode = currentNode.getRightSubTree();
            }
        }

        return null;
    }
    rotateLeft(node) {
        let parent = node.getParent();
        let rightChild = node.getRightSubTree();

        node.setRightSubTree(rightChild.getLeftSubTree());

        if(rightChild.getLeftSubTree() != null) {
            rightChild.getLeftSubTree().setParent(node);
        }

        rightChild.setLeftSubTree(node);
        node.setParent(rightChild);

        this.replaceParentChild(parent, node, rightChild);
    }

    rotateRight(node) {
        let parent = node.getParent();
        let leftChild = node.getLeftSubTree();

        node.setLeftSubTree(leftChild.getRightSubTree());

        if(leftChild.getRightSubTree() != null) {
            leftChild.getRightSubTree().setParent(node);
        }

        leftChild.setRightSubTree(node);
        node.setParent(leftChild);

        this.replaceParentChild(parent, node, leftChild);
    }

    replaceParentChild(parent, oldChild, newChild) {
        if(parent == null) {
            this.root = newChild;
        } else if(parent.getLeftSubTree() == oldChild) {
            parent.setLeftSubTree(newChild);
        } else if(parent.getRightSubTree() == oldChild) {
            parent.setRightSubTree(newChild);
        }

        if(newChild != null) {
            newChild.setParent(parent);
        }
    }

    insert(data) {
        let current = this.root;
        let parent = null;

        while (current != null) {
            parent = current;
            if(data < current.getData()) {
                current = current.getLeftSubTree();
            } else if(data > current.getData()) {
                current = current.getRightSubTree();
            } else {
                return;
            }
        }

        let newNode = new BinaryTree(data);
        if(parent == null) {
            this.root = newNode;
        } else if(data < parent.getData()) {
            parent.setLeftSubTree(newNode);
        } else {
            parent.setRightSubTree(newNode);
        }

        newNode.setParent(parent);
        this.rebalanceAfterInsertion(newNode);
    }

    rebalanceAfterInsertion(node) {
        let parent = node.getParent();

        if(parent == null) {    // root노드에 새로운 노드 삽입하는 경우
            node.color = BLACK;
            return;
        }

        if(parent.color == BLACK) { // 부모노드 빨간색 아닐경우 리턴
            return;
        }

        let uncle = this.getUncle(parent);
        let grandParent= parent.getParent();
        if(uncle != null && uncle.color == RED) {   // 부모, 삼촌 노드가 빨간색일 경우 (BlackHeight를 유지하게끔 변경)
            parent.color = BLACK;
            uncle.color = BLACK;
            grandParent.color = RED;
            this.rebalanceAfterInsertion(grandParent);  // 증조할아버지 빨간색일 경우 빨간색 연속 위반, 할아버지 노드를 삽입한 경우로 재귀함수 실행
        } else if(this.isBlack(uncle) == true) {    // 삼촌노드가 검정색일 경우
            if(grandParent.getRightSubTree() == parent && parent.getLeftSubTree() == node) {    // > 모양일 때
                this.rotateRight(parent);
                this.rotateLeft(grandParent);
                node.color = BLACK;
                grandParent.color = RED;
            } else if(grandParent.getLeftSubTree() == parent && parent.getRightSubTree() == node){
                this.rotateLeft(parent);
                this.rotateRight(grandParent);
                node.color = BLACK;
                grandParent.color = RED;
            } else if(grandParent.getRightSubTree() == parent && parent.getRightSubTree() == node) {
                this.rotateLeft(grandParent);
                parent.color = BLACK;
                grandParent.color = RED;
            } else if(grandParent.getLeftSubTree() == parent && parent.getLeftSubTree() == node) {
                this.rotateRight(grandParent);
                parent.color = BLACK;
                grandParent.color = RED;
            }
        }

    }

    getUncle(parent) {
        let grandParent = parent.getParent();
        if(grandParent.getLeftSubTree() == parent) {
            return grandParent.getRightSubTree();
        } else if(grandParent.getRightSubTree() == parent) {
            return grandParent.getLeftSubTree();
        }

        return null;
    }

    isBlack(node) {
        return node == null || node.color == BLACK;
    }

    remove(data) {
        let currentNode = this.root;
        while(currentNode != null && currentNode.getData() != data) {
            if(data < currentNode.getData()) {
                currentNode = currentNode.getLeftSubTree();
            } else if(data > currentNode.getData()) {
                currentNode = currentNode.getRightSubTree();
            }
        }

        if(currentNode == null) {
            return;
        }

        let replaceNode = null;
        let deleteNodeColor = RED;

        if(currentNode.getLeftSubTree() == null || currentNode.getRightSubTree() == null) { // 제거할 노드의 자식노드가 1개 이하일 때
            replaceNode = this.removeWithZeroOrOneChild(currentNode);
            deleteNodeColor = currentNode.color;
        } else {    // 제거할 노드의 자식노드가 2개일 때
            let succesor = this.getBiggestNode(currentNode.getLeftSubTree());   // 왼쪽 자식 노드에서 가장 큰 값 구하기
            currentNode.setData(succesor.getData());
            replaceNode = this.removeWithZeroOrOneChild(succesor);  // 중복되니까 삭제, 이때 왼쪽 자식 노드에서 가장 큰 값은 자식노드를 왼쪽 자식 또는 아예 없으므로 removeWithZeroOrOneChild함수 사용
            deleteNodeColor = currentNode.color;
        }

        if(deleteNodeColor == BLACK) {
            this.rebalanceAfterDeletion(replaceNode);

            if(replaceNode instanceof NilNode) {
                this.replaceParentChild(replaceNode.getParent(), replaceNode, null);
            }
        }
    }

    removeWithZeroOrOneChild(node) {
        if(node.getLeftSubTree() != null) {
            this.replaceParentChild(node.getParent(), node, node.getLeftSubTree());
            return node.getLeftSubTree();
        } else if(node.getRightSubTree() != null) {
            this.replaceParentChild(node.getParent(), node, node.getRightSubTree());
            return node.getRightSubTree();
        } else {
            let newChild = (node.color == BLACK) ? new NilNode() : null;    // 검정색 노드를 삭제하고 rebalanceAfterDeletion을 실행할때 대체노드가 null이면 부모노드 참조 어려움
            this.replaceParentChild(node.getParent(), node, newChild);
            return newChild;
        }
    }

    getBiggestNode(node) {
        while(node.getRightSubTree() != null) {
            node = node.getRightSubTree();
        }

        return node
    }

    rebalanceAfterDeletion(node) {
        if(node == this.root) {
            node.color = BLACK;
            return;
        }

        let sibling = this.getSibling(node);

        if(sibling.color == RED) {  // 형제 노드 빨간색의 경우
            this.handleRedSibling(node, sibling);
            sibling = this.getSibling(node);
        }

        if(this.isBlack(sibling)) { // 형제 노드 검정색 경우
            if(this.isBlack(sibling.getLeftSubTree()) && this.isBlack(sibling.getRightSubTree())) { // 형제노드의 자식노드 둘 다 검정색 경우
                if(node.getParent().color == RED) { // 노드의 부모노드가 빨간색일 경우
                    sibling.color = RED;
                    node.getParent().color = BLACK;
                } else {    // 노드의 부모노드가 검정색일 경우
                    sibling.color = RED;
                    this.rebalanceAfterDeletion(node.getParent())
                }
            } else {    // 형제노드의 자식노드가 하나라도 빨간색일 경우
                this.handleBlackSiblingWithAtLeastOneRedChild(node, sibling);
            }
        }
    }

    getSibling(node) {
        let parent = node.getParent();

        if(node == parent.getLeftSubTree()) {
            return parent.getRightSubTree();
        } else if(node == parent.getRightSubTree()) {
            return parent.getLeftSubTree();
        }
    }

    handleRedSibling(node, sibling) {
        sibling.color = BLACK;
        node.getParent().color = RED;

        if(node.getParent().getLeftSubTree() == node) {
            this.rotateLeft(node.getParent());
        } else {
            this.rotateRight(node.getParent());
        }
    }

    handleBlackSiblingWithAtLeastOneRedChild(node, sibling) {
        let nodeIsLeftChild = (node.getParent().getLeftSubTree() == node);

        if(nodeIsLeftChild == true && this.isBlack(sibling.getRightSubTree())) {    // 노드가 부모 노드의 왼쪽노드이고 형제노드의 바깥쪽 자식 노드가 검정색인 경우, 형제노드의 바깥쪽 자식노드를 빨간색으로 만들기
            sibling.getLeftSubTree().color = BLACK;
            sibling.color = RED;
            this.rotateRight(sibling);
            sibling = node.getParent().getRightSubTree();
        } else if(nodeIsLeftChild = false && this.isBlack(sibling.getLeftSubTree())) {  // 노드가 부모 노드의 왼쪽노드이고 형제노드의 바깥쪽 자식 노드가 검정색인 경우, 형제노드의 바깥쪽 자식노드를 빨간색으로 만들기
            sibling.getRightSubTree().color = BLACK;
            sibling.color = RED;
            this.rotateLeft(sibling);
            sibling = node.getParent().getLeftSubTree();
        }

        sibling.color = node.getParent().color;
        node.getParent().color = BLACK;

        if(nodeIsLeftChild) {
            sibling.getRightSubTree().color = BLACK;
            this.rotateLeft(node.getParent());
        } else {
            sibling.getLeftSubTree().color = BLACK;
            this.rotateRight(node.getParent());
        }
    }
}

class NilNode extends BinaryTree {
    constructor() {
        super(0);
        this.color = BLACK;
    }
}

let rbTree = new RedBlackTree();
rbTree.insert(17);
rbTree.insert(9);
rbTree.insert(19);
rbTree.insert(75);
rbTree.insert(85);

rbTree.remove(19);
rbTree.remove(75);
rbTree.remove(85);

console.log(rbTree.root);

if(rbTree.root) {
    rbTree.root.inOrderTraversal(rbTree.root);
}