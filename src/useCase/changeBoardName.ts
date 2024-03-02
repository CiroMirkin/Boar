import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardActionParams, boardModel } from "../models/board";

interface changeBoardNameParams extends boardActionParams {
    newName: string
}

export function changeBoardName({ board, newName }: changeBoardNameParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    newBoard.boardData.name = newName
    return newBoard
}