import { ToDoCollection } from "./toDoCollection";
import { ToDoItem } from "./toDoItem";
import * as inquirer from 'inquirer';
import { JsonToDoCollection } from "./jsonToDoCollection";

let collection: ToDoCollection = new JsonToDoCollection('Maciek', [])
let showCompleted = true

enum Commands {
    Toggle = "Toggle visibility of completed items",
    Add = "Add new task",
    Complete = "Mark task as complete",
    Purge = "Remove completed tasks",
    Quit = "Quit"
}

function displayToDoList(): void {
    console.log(`${collection.userName} list (${collection.getItemCounts().incomplete} item incomplete from ${collection.getItemCounts().total} total):`)
    collection.getToDos(showCompleted).forEach(item => item.printDetails())
}

function promptAdd(): void {
    console.clear()
    inquirer.prompt({
        type: "input",
        name: "add",
        message: "What is yout task?"
    }).then(answers => {
        if (answers["add"] !== "") {
            collection.addToDo(answers["add"])
        }
        promptUser()
    }) 
}

function promptPurge() {
    console.clear()
    collection.removeComplete()
    promptUser()
}

function promptComplete() {
    console.clear()
    if (collection.getItemCounts().incomplete > 0) {
        inquirer.prompt({
            type: "checkbox",
            name: "complete",
            message: "Mark items as completed",
            choices: collection.getToDos(showCompleted).map(item => {
               return {name: item.task, value: item.id, checked: item.complete}
            })
        }).then(answears => {
            let completedTasks = answears["complete"] as number[]
            collection.getToDos(true).forEach(item => {
                collection.markComplete(item.id, completedTasks.find(id => id === item.id) != undefined)
            })
            promptUser()
        });
    } else {
        promptUser()
    }
}
    

function promptUser(): void {
    console.clear()
    displayToDoList()
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Select option",
        choices: Object.values(Commands)
    }).then(answers => {
       switch(answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted
                promptUser()
                break
            case Commands.Add:
                promptAdd()
                break
            case Commands.Purge:
                promptPurge()
                break
            case Commands.Complete:
                promptComplete()
                break
       }
    })
}
promptUser();
