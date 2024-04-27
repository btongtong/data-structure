// 모든 데이터 출력 printAll
// head에 데이터 삽입 addFirst
// head에서 데이터 제거 removeFirst
// tail에 데이터 삽입 addLast
// tail에서 데이터 제거 removeLast
// 리스트 비었는지 체크 isEmpty

import { DoublyLinkedList } from "./DoublyLinkedList.mjs";

class Deque {
    constructor() {
        this.list = new DoublyLinkedList();
    }

    printAll() {
        this.list.printAll();
    }

    addFirst(data) {
        this.list.insertAt(0, data);
    }

    removeFirst() {
        this.list.deleteAt(0);
    }

    addLast(data) {
        this.list.insertAt(this.list.count, data);
    }

    removeLast() {
        return this.list.deleteLast();
    }

    isEmpty() {
        return (this.list.count == 0);
    }
}

export { Deque }