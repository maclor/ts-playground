import { ToDoItem } from "./toDoItem";

export class ToDoCollection {
    private nextId: number = 1

    constructor(public userName: string, public toDoItems: ToDoItem[] = []) {

    }

    addToDo(task: string) : number {
        while (this.getToDoById(this.nextId)) {
            this.nextId++
        }
        this.toDoItems.push(new ToDoItem(this.nextId, task))
        return this.nextId
    }

    getToDoById(id: number) : ToDoItem {
        return this.toDoItems.find(item => item.id === id);
    }

    markComplete(id: number, complete: boolean) {
        const toDoItem = this.getToDoById(id)
        if (toDoItem) {
            toDoItem.complete = complete
        }
    }
}