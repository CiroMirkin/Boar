import { taskModel } from "./task";

export type TaskList = taskModel[]
export type TaskListInEachColumn = TaskList[]

export const emptyTaskListInEachColumn: TaskListInEachColumn = [[], [], []]
