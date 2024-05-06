// 해당 트리(노드)의 데이터 리턴 getData()
// 해당 트리(노드)의 데이터 설정 setData(data)
// 해당 트리(노드)의 왼쪽 서브 트리 리턴 getLeftSubTree()
// 해당 트리(노드)의 오른쪽 서브 트리 리턴 getRightSubTree()
// 해당 트리의 왼쪽 서브 트리를 tree로 설정 setLeftSubTree(tree)
// 해당 트리의 오른쪽 서브 트리를 tree로 설정 setRightSubTree(tree)
// 전위순회 preOrderTraversal()
// 중위순회 inOrderTraversal()
// 후위순회 postOrderTraversal()
// 왼쪽 자식 노드 제거 removeLeftSubTree()
// 오른쪽 자식 노드 제거 removeRightSubTree()

const RED = false;
const BLACK = true;
class BinaryTree{
    constructor(data) {
        this.data = data;
        this.leftSubTree = null;
        this.rightSubTree = null;
        this.parentTree = null;

        this.color = RED;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    getLeftSubTree() {
        return this.leftSubTree;
    }

    getRightSubTree() {
        return this.rightSubTree;
    }

    setLeftSubTree(tree) {
        this.leftSubTree = tree;
    }

    setRightSubTree(tree) {
        this.rightSubTree = tree;
    }

    preOrderTraversal(tree) {
        if(tree == null) return;

        console.log(tree.data);
        this.preOrderTraversal(tree.getLeftSubTree());
        this.preOrderTraversal(tree.getRightSubTree());
    }

    inOrderTraversal(tree) {
        if(tree == null) return;

        this.inOrderTraversal(tree.getLeftSubTree());
        console.log(tree.data);
        this.inOrderTraversal(tree.getRightSubTree());
    }

    postOrderTraversal(tree) {
        if(tree == null) return;

        this.postOrderTraversal(tree.getLeftSubTree());
        this.postOrderTraversal(tree.getRightSubTree());
        console.log(tree.data);
    }

    removeLeftSubTree() {
        let deletingNode = this.getLeftSubTree();
        this.setLeftSubTree(null);
        return deletingNode;
    }

    removeRightSubTree() {
        let deletingNode = this.getRightSubTree();
        this.setRightSubTree(null);
        return deletingNode;
    }

    getParent() {
        return this.parentTree;
    }

    setParent(tree) {
        this.parentTree = tree;
    }
}

export { BinaryTree, RED, BLACK }