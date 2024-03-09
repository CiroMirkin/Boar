import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { columnUseCaseParams } from "./useCase";
import { boardModel } from "../models/board";

export function addColumnAtTheEnd({ board, column }: columnUseCaseParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    newBoard.columnList.push(column)
    return newBoard
}