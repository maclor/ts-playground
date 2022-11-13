import { ToDoCollection } from "./toDoCollection"
import { ToDoItem } from "./toDoItem"
import * as lowdb from "lowdb"
import * as FileSync from "lowdb/adapters/FileSync"

type schemaType = {
    tasks: {id: number, task: string, complete: boolean}[]
}

export class JsonToDoCollection extends ToDoCollection {
    private database: lowdb.LowdbSync<schemaType>
    private listKeyName: string = "tasks"

    constructor(public userName: string, toDoItems: ToDoItem[] = []) {
        super(userName, toDoItems)
        this.database = lowdb(new FileSync("todo.json"))
        if (this.database.has(this.listKeyName).value()) {
            let dbItems: ToDoItem[] = this.database.get(this.listKeyName).value()
            console.log(dbItems)
            dbItems.forEach(item => this.itemMap.set(item.id, new ToDoItem(item.id, item.task, item.complete)))
        } else {
            this.database.set(this.listKeyName, toDoItems).write()
            toDoItems.forEach(item => this.itemMap.set(item.id, item))
        }
    }

    addToDo(task: string): number {
        let result = super.addToDo(task)
        this.storeTasks()
        return result
    }

    markComplete(id: number, complete: boolean): void {
        super.markComplete(id, complete)
        this.storeTasks()
    }

    removeComplete(): void {
        super.removeComplete()
        this.storeTasks()
    }

    private storeTasks(): void {
        this.database.set(this.listKeyName, [...this.itemMap.values()]).write()
    }
}