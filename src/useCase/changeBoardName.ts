import { boardActionParams, boardModel } from "../models/board";

interface changeBoardNameParams extends boardActionParams {
    newName: string
}

export function changeBoardName({ board, newName }: changeBoardNameParams): boardModel {
    return board
}