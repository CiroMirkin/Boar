import { columnModel, defaultColumnList } from "./column";
import { taskList, taskModel } from "./task";

export interface boardData {
    id: string,
    name: string
}

export interface boardModel {
    boardData: boardData,
    columnList: columnModel[],
    tasksInColumns: taskList[] 
}
  
export const defaultBoard: boardModel = {
    boardData: {
        id: '0',
        name: "Tablero básico"
    },
    columnList: defaultColumnList,
    tasksInColumns: [[], [], []]
};

export interface boardActionParams {
    task: taskModel;
    board: boardModel;
}
export interface boardAction {
    action({ task, board }: boardActionParams): boardModel;
}
