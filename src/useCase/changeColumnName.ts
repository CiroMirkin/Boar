import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardModel, changeNameParams } from "../models/board";
import { columnModel } from "../models/column";

interface changeNameOfColumnParams extends changeNameParams {
    column: columnModel
}

export function changeNameOfColumn({ board, column, newName }: changeNameOfColumnParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    return newBoard
}