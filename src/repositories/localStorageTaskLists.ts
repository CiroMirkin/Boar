import { taskList } from "@/models/task";
import { emptyTaskListInEachColumn } from "@/models/taskListInEachColumn";
import { TaskListInEachColumnRepository } from "@/models/taskListRepository";

export default class LocalStorageTaskListInEachColumnRepository implements TaskListInEachColumnRepository {
    #key;
    constructor() {
        this.#key = "taskListInEachColumn";
    }
    save(taskListInEachColumn: taskList[]): void {
        localStorage.setItem(this.#key, JSON.stringify(taskListInEachColumn))
    }
    getAll(): taskList[] {
        return localStorage.getItem(this.#key)
            ? JSON.parse(localStorage.getItem(this.#key) as string)
            : emptyTaskListInEachColumn
    }
}