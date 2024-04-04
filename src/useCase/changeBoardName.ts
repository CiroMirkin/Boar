import { boardModel } from "../model/board";
import { changeNameParams } from "./useCase";

export function changeBoardName({ board, newName }: changeNameParams): boardModel {
    const newBoard = board
    newBoard.name = newName
    return newBoard
}