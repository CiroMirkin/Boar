import { TaskListInEachColumn, emptyTaskListInEachColumn } from "@/model/taskListInEachColumn";
import { TaskListInEachColumnRepository } from "@/model/taskListRepository";

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