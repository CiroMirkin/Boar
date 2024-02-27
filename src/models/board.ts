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
    task: taskModel;
    board: boardModel;
}
export type boardActionFunction = ({ task, board }: boardActionParams) => boardModel;
export interface boardAction {
    action: boardActionFunction;
}
