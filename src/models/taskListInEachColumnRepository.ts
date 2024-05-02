import { TaskListInEachColumn } from "./taskList";

export interface TaskListInEachColumnRepository {
    save(taskListInEachColumn: TaskListInEachColumn): void;
    getAll(): TaskListInEachColumn;
}