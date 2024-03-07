import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardModel, columnActionParams } from "../models/board";

export function deleteThisColumn({ board, column }: columnActionParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board) 
    return newBoard
}