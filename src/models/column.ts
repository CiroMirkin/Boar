import { taskModel } from "./task";

export interface columnModel {
    id: string,
    title: string,
    taskList: taskModel[]
}