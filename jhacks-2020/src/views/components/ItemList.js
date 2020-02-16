class ToDoItem {
    constructor(name, notes, date, estTime, difficulty) {
        this.name = name;
        this.status = false;
        this.notes = notes;

        //Components of weight
        this.date = date; //stored as date object, hrsUntil will determine weight
        this.estTime = estTime; //estimated time required to complete (min)
        this.difficulty = difficulty; //Hard(2), Medium(1), Easy(0)

        this.weight = this.calcWeight();
    }

    hrsUntil() {
        return (this.date - new Date()) / 3600000;
    }

    calcWeight() {
        if (this.hrsUntil() <= 0) {
            return 1000;
        }
        return (1 / (this.hrsUntil() / 2400)) + (this.difficulty * this.estTime / 120);
    }

    toString() {
        return this.name + " " + this.status + " " + this.notes + " " + this.weight + " " + this.date.toString() + " " + this.estTime + " " + this.difficulty;
    }
}

class Node {
    // constructor 
    constructor(element) {
        this.element = element;
        this.next = null
    }
    getElement() {
        return this.element;
    }
}

class ItemList {
    constructor() {
        this.head = null;
        this.size = 0;
        this.reload();
    }

    add(element) {
        var current;
        var node = new Node(element);
        /* Special case for head node */
        if (this.head == null || this.head.element.weight <= element.weight) {
            node.next = this.head;
            this.head = node;
        }
        else {

            /* Locate the node before point of insertion. */
            current = this.head;

            while (current.next != null &&
                current.next.element.weight > element.weight)
                current = current.next;

            node.next = current.next;
            current.next = node;
        }
        this.size++;
    }

    // insert element at the position index 
    // of the list 
    insertAt(element, index) {
        if (index > 0 && index > this.size)
            return false;
        else {
            // creates a new node 
            var node = new Node(element);
            var curr, prev;

            curr = this.head;

            // add the element to the 
            // first index 
            if (index == 0) {
                node.next = this.head;
                this.head = node;
            } else {
                curr = this.head;
                var it = 0;

                // iterate over the list to find 
                // the position to insert 
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }

                // adding an element 
                node.next = curr;
                prev.next = node;
            }
            this.size++;
        }
    }

    // removes an element from the 
    // specified location 
    removeFrom(index) {
        if (index > 0 && index > this.size)
            return -1;
        else {
            var curr, prev, it = 0;
            curr = this.head;
            prev = curr;

            // deleting first element 
            if (index == 0) {
                this.head = curr.next;
            } else {
                // iterate over the list to the 
                // position to removce an element 
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }

                // remove the element 
                prev.next = curr.next;
            }
            this.size--;

            // return the remove element 
            return curr.element;
        }

    }

    // removes a given element from the 
    // list 
    removeElement(element) {
        var current = this.head;
        var prev = null;

        // iterate over the list 
        while (current != null) {
            // comparing element with current 
            // element if found then remove the 
            // and return true 
            if (current.element == element) {
                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.size--;
                return current.element;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }

    // finds the index of element 
    indexOf(element) {
        var count = 0;
        var current = this.head;

        // iterae over the list 
        while (current != null) {
            // compare each element of the list 
            // with given element 
            if (current.element == element)
                return count;
            count++;
            current = current.next;
        }

        // not found 
        return -1;
    }

    // checks the list for empty 
    isEmpty() {
        return this.size == 0;
    }

    // gives the size of the list 
    size_of_list() {
        console.log(this.size);
    }

    toArray() {
        var curr = this.head;
        var arr = [];
        while (curr) {
            arr.push(curr.element);
            curr = curr.next;
        }
        return arr;
    }

    printList() {
        var curr = this.head;
        var str = "";
        while (curr) {
            str += curr.element.toString() + "\n";
            curr = curr.next;
        }
        console.log(str);
    }

    save() {
        //Run to save
        document.cookie = JSON.stringify(this);
        //console.log(document.cookie);

    }

    reload() {
        if (!document.cookie) {
            return
        }
            const tmpList = JSON.parse(document.cookie);
            var curr = tmpList.head;
            var ele = curr.element;
            while (curr) {
                ele = curr.element;
                this.add(new ToDoItem(ele.name, ele.notes, new Date(ele.date), ele.estTime, ele.difficulty));
                curr = curr.next;
            }

        
    }


}

export { ItemList };
export { ToDoItem };