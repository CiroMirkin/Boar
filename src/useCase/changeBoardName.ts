import { boardModel } from "../models/board";
import { changeNameParams } from "./useCase";

export function changeBoardName({ board, newName }: changeNameParams): boardModel {
    const newBoard = board
    newBoard.boardData.name = newName
    return newBoard
}