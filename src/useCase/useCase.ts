import { boardModel } from "../models/board";
import { columnModel } from "../models/column";
import { taskList, taskModel } from "../models/task";


export interface boardUseCaseParams {
    board: boardModel;
}
export interface taskUseCaseParams {
    taskList: taskList[];
    task: taskModel;
}
export interface changeNameParams extends boardUseCaseParams {
    newName: string;
}
export interface columnUseCaseParams extends boardUseCaseParams {
    column: columnModel;
}
