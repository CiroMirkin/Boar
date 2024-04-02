import { emptyTaskListInEachColumn, taskList } from "@/models/task";
import { TaskListsRepository } from "@/models/taskListRepository";

export default class LocalStorageTaskListsRepository implements TaskListsRepository {
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