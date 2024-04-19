import { TaskListInEachColumn, emptyTaskListInEachColumn } from "@/models/taskListInEachColumn";
import { TaskListInEachColumnRepository } from "@/models/taskListInEachColumnRepository";

export default class LocalStorageTaskListInEachColumnRepository implements TaskListInEachColumnRepository {
    #key;
    constructor() {
        this.#key = "taskListInEachColumn";
    }
    save(taskListInEachColumn: TaskListInEachColumn): void {
        localStorage.setItem(this.#key, JSON.stringify(taskListInEachColumn))
    }
    getAll(): TaskListInEachColumn {
        return localStorage.getItem(this.#key)
            ? JSON.parse(localStorage.getItem(this.#key) as string)
            : emptyTaskListInEachColumn
    }
}