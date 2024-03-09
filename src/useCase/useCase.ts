import { boardModel } from "../models/board";
import { columnModel } from "../models/column";
import { taskModel } from "../models/task";


export interface boardActionParams {
    board: boardModel;
}
export interface taskActionParams extends boardActionParams {
    task: taskModel;
}
export interface changeNameParams extends boardActionParams {
    newName: string;
}
export interface columnActionParams extends boardActionParams {
    column: columnModel;
}
