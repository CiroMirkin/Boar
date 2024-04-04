import { boardModel } from "../model/board";
import { columnModel } from "../model/column";
import { taskList, taskModel } from "../model/task";


export interface boardUseCaseParams {
    board: boardModel;
}
export interface taskUseCaseParams {
    taskListInEachColumn: taskList[];
    task: taskModel;
}
export interface changeNameParams extends boardUseCaseParams {
    newName: string;
}
export interface columnUseCaseParams {
    columnList: columnModel[]
    column: columnModel;
}
