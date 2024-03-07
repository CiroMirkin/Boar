import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardModel, columnActionParams } from "../models/board";

export function deleteThisColumn({ board, column }: columnActionParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board) 
    const newColumns = newBoard.columnList.filter(columnInBoard => columnInBoard.id !== column.id)
    newBoard.columnList = newColumns
    return newBoard
}