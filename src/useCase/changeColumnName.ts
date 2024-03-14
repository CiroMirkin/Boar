import { boardModel } from "../models/board";
import { changeNameParams } from "./useCase";
import { columnModel } from "../models/column";

interface changeNameOfColumnParams extends changeNameParams {
    column: columnModel
}

export function changeNameOfColumn({ board, column, newName }: changeNameOfColumnParams): boardModel {
    const newBoard = board
    const newColumns = newBoard.columnList.map(columnInBoard => {
        if(columnInBoard.id === column.id) {
            columnInBoard.name = newName
        }
        return columnInBoard
    })
    newBoard.columnList = newColumns
    return newBoard
}