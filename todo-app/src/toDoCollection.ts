import { ToDoItem } from "./toDoItem";

type ItemCounts = {
    total: number,
    incomplete: number
}

export class ToDoCollection {
    private nextId: number = 1
    private itemMap = new Map<number, ToDoItem>()

    constructor(public userName: string, toDoItems: ToDoItem[] = []) {
        toDoItems.forEach(item => this.itemMap.set(item.id, item))
    }

    addToDo(task: string) : number {
        while (this.getToDoById(this.nextId)) {
            this.nextId++
        }
        this.itemMap.set(this.nextId, new ToDoItem(this.nextId, task))
        return this.nextId
    }

    getToDoById(id: number) : ToDoItem {
        return this.itemMap.get(id);
    }

    markComplete(id: number, complete: boolean) {
        const toDoItem = this.getToDoById(id)
        if (toDoItem) {
            toDoItem.complete = complete
        }
    }

    getToDos(includeComplete: boolean) : ToDoItem[] {
        return [...this.itemMap.values()].filter(item => includeComplete || !item.complete)
    }

    removeComplete() : void {
        this.itemMap.forEach(item => {
            if (item.complete) {
                this.itemMap.delete(item.id)
            }
        })
    }

    getItemCounts(): ItemCounts {
        return {
            total: this.itemMap.size,
            incomplete: this.getToDos(false).length
        }
    }
}