import { boardModel } from "../models/board";
import { columnModel } from "../models/column";
import { taskModel } from "../models/task";


export interface boardUseCaseParams {
    board: boardModel;
}
export interface taskUseCaseParams extends boardUseCaseParams {
    task: taskModel;
}
export interface changeNameParams extends boardUseCaseParams {
    newName: string;
}
export interface columnActionParams extends boardUseCaseParams {
    column: columnModel;
}
