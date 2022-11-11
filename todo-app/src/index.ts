import { ToDoCollection } from "./toDoCollection";
import { ToDoItem } from "./toDoItem";

let toDos = [
    new ToDoItem(1, 'Clean the desk'),
    new ToDoItem(2, 'Learn TypeScript'),
    new ToDoItem(3, 'Teach Franek how to count in binary'),
    new ToDoItem(4, 'Build binary 4 bit calculator'),
    new ToDoItem(5, 'Go sleep')
]

let collection = new ToDoCollection('Maciek', toDos)

console.clear()
console.log(`List ${collection.userName}`)
console.log(JSON.stringify(toDos))

console.log('Adding some items....')
let newId = collection.addToDo('Add new item to the ToDo list')
let toDoItem = collection.getToDoById(newId)
console.log('Added item:')
console.log(JSON.stringify(toDoItem))
