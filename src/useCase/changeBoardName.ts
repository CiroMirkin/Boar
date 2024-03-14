import { getCopyOfTheBoardData } from "../utility/copyBoardData";
import { boardModel } from "../models/board";
import { changeNameParams } from "./useCase";

export function changeBoardName({ board, newName }: changeNameParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    newBoard.boardData.name = newName
    return newBoard
}