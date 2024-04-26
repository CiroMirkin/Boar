import { boardModel } from "../models/board";
import { Column } from "../models/column";
import { taskModel } from "../models/task";
import { TaskList } from "@/models/taskListInEachColumn";


export interface boardUseCaseParams {
    board: boardModel;
}
export interface taskUseCaseParams {
    taskListInEachColumn: TaskList[];
    task: taskModel;
}
export interface changeNameParams extends boardUseCaseParams {
    newName: string;
}
export interface columnUseCaseParams {
    columnList: Column[]
    column: Column;
}
