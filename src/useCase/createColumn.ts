import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { columnActionParams } from "../models/board";
import { boardModel } from "../models/board";

export function addColumnAtTheEnd({ board, column }: columnActionParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    newBoard.columnList.push(column)
    return newBoard
}