import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardModel } from "../models/board";
import { columnUseCaseParams } from "./useCase";

export function deleteThisColumn({ board, column }: columnUseCaseParams): boardModel {
    if(board.columnList.length <= 3) throw('Para poder eliminar una columna debe haber mas de tres.')
    
    const newBoard = getCopyOfTheBoardData(board) 
    const newColumns = newBoard.columnList.filter(columnInBoard => columnInBoard.id !== column.id)
    newBoard.columnList = newColumns
    return newBoard
}