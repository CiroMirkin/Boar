import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardModel, changeBoardNameParams } from "../models/board";

export function changeBoardName({ board, newName }: changeBoardNameParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    newBoard.boardData.name = newName
    return newBoard
}