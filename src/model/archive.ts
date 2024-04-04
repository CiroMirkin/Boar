import { taskList } from "./task";

export interface taskListArchived {
    date: string,
    tasklist: taskList
}

export type archive = taskListArchived[]