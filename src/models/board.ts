import { columnModel, defaultColumnList } from "./column";
import { taskList } from "./task";

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
