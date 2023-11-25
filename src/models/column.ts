import { taskModel } from "./task";

export interface columnModel {
    id: string,
    name: string,
    taskList: taskModel[]
}