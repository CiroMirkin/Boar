import { boardModel } from "../models/board";
import { columnModel } from "../models/column";
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
    columnList: columnModel[]
    column: columnModel;
}
