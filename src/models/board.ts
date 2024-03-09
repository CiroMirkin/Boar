import { taskListArchived } from "./archive";
import { columnModel, defaultColumnList } from "./column";

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
