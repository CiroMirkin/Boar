import { taskListArchived } from "./archive";
import { columnModel, defaultColumnList } from "./column";
import { taskModel } from "./task";

export interface boardData {
    id: string,
    name: string
}

export interface boardModel {
    boardData: boardData,
    columnList: columnModel[],
    archive: taskListArchived[]
}
  
export const defaultBoard: boardModel = {
    boardData: {
        id: '0',
        name: "Tablero básico"
    },
    columnList: defaultColumnList,
    archive: []
};

export interface boardActionParams {
    board: boardModel;
}
export interface taskActionParams extends boardActionParams {
    task: taskModel;
}
export type boardActionFunction = ({ task, board }: taskActionParams) => boardModel;
export interface boardAction {
    action: boardActionFunction;
}
