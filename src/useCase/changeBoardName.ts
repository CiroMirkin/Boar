import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardModel, changeNameParams } from "../models/board";

export function changeBoardName({ board, newName }: changeNameParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    newBoard.boardData.name = newName
    return newBoard
}