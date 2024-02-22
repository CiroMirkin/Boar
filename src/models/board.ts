import { columnModel, defaultColumnList } from "./column";
import { taskModel } from "./task";

export interface boardData {
    id: string,
    name: string
}

export interface boardModel {
    boardData: boardData,
    columnList: columnModel[]
}
  
export const defaultBoard: boardModel = {
    boardData: {
        id: '0',
        name: "Tablero básico"
    },
    columnList: defaultColumnList
};

export interface boardActionParams {
    task: taskModel;
    board: boardModel;
}
export interface boardAction {
    action({ task, board }: boardActionParams): boardModel;
}
