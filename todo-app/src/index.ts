import { ToDoCollection } from "./toDoCollection";
import { ToDoItem } from "./toDoItem";

let toDos: ToDoItem[] = [
    new ToDoItem(1, 'Clean the desk'),
    new ToDoItem(2, 'Learn TypeScript'),
    new ToDoItem(3, 'Teach Franek how to count in binary'),
    new ToDoItem(4, 'Build binary 4 bit calculator'),
    new ToDoItem(5, 'Go sleep')
]

let collection: ToDoCollection = new ToDoCollection('Maciek', toDos)

console.clear()
console.log(`List ${collection.userName}`)
console.log(JSON.stringify(toDos))

console.log('Adding some items....')
let newId: number = collection.addToDo('Add new item to the ToDo list')
let toDoItem: ToDoItem = collection.getToDoById(newId)
console.log('Added item:')
console.log(toDoItem.printDetails())
console.log('Mark one of items as completed')
collection.markComplete(3, true)
console.log('Get all items')
collection.getToDos(true).forEach(item => item.printDetails())
let itemCounts = collection.getItemCounts()
console.log(`Number of tasks: ${itemCounts.incomplete}/${itemCounts.total}`)
console.log('Get not complete items')
collection.getToDos(false).forEach(item => item.printDetails())
itemCounts = collection.getItemCounts()
console.log(`Number of tasks: ${itemCounts.incomplete}/${itemCounts.total}`)
console.log('Remove complete items and get all items to check if it works')
collection.removeComplete()
collection.getToDos(true).forEach(item => item.printDetails())
itemCounts = collection.getItemCounts()
console.log(`Number of tasks: ${itemCounts.incomplete}/${itemCounts.total}`)
