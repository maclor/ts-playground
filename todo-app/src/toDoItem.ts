export class ToDoItem {
    constructor(public id: number,
        public task: string,
        public complete: boolean = false) {
        }

    printDetails(): void {
        let completeStr: String = this.complete ? "(completed)" : "(not completed)"
        console.log(`${this.id}\t${this.task}\t${completeStr}`)
    }
}
