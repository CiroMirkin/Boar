import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardModel, changeNameParams } from "../models/board";
import { columnModel } from "../models/column";

interface changeNameOfColumnParams extends changeNameParams {
    column: columnModel
}

export function changeNameOfColumn({ board, column, newName }: changeNameOfColumnParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    const newColumns = newBoard.columnList.map(columnInBoard => {
        if(columnInBoard.id === column.id) {
            columnInBoard.name = newName
        }
        return columnInBoard
    })
    newBoard.columnList = newColumns
    return newBoard
}