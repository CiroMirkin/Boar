import { TaskListInEachColumn } from "./taskListInEachColumn";

export interface TaskListInEachColumnRepository {
    save(taskListInEachColumn: TaskListInEachColumn): void;
    getAll(): TaskListInEachColumn;
}