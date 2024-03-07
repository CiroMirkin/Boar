import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardActionParams, boardModel } from "../models/board";
import { columnModel } from "../models/column";

interface columnActionParams extends boardActionParams {
    column: columnModel
}

export function addColumnAtTheEnd({ board, column }: columnActionParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    newBoard.columnList.push(column)
    return newBoard
}