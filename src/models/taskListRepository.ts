import { taskList } from "./task";

export interface TaskListsRepository {
    save(taskListInEachColumn: taskList[]): void;
    getAll(): taskList[];
}