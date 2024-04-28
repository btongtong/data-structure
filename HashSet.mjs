// 데이터 삽입 add(data)
// 데이터 체크 isContain(data)
// 데이터 제거 remove(data)
// 셋 비우기 clear()
// 셋이 비었는지 체크 isEmpty()
// 모든 데이터 출력 printAll()

import { HashTable } from "./HashTable.mjs";

class HashSet {
    constructor() {
        this.hashTable = new HashTable();
    }

    add(data) {
        if(this.hashTable.get(data) == null) {
            this.hashTable.set(data, -1);
        }
    }

    isContain(data) {
        return this.hashTable.get(data) != null;
    }

    remove(data) {
        this.hashTable.remove(data);
    }

    clear() {
        for(let i = 0; i < this.hashTable.arr.length; i++) {
            this.hashTable.arr[i].clear();
        }
    }

    isEmpty() {
        let empty = true;
        for(let i = 0; i < this.hashTable.arr.length; i++) {
            if(this.hashTable.arr[i].count > 0) {
                empty = false;
                break;
            }
        }

        return empty;
    }

    printAll() {
        for(let i = 0; i < this.hashTable.arr.length; i++) {
            let currentNode = this.hashTable.arr[i].head;
            while(currentNode != null) {
                console.log(currentNode.data.key);
                currentNode = currentNode.next;
            }
        }
    }
}

export { HashSet }