import { getCopyOfTheBoardData } from "../utility/copyBoardData";
import { columnUseCaseParams } from "./useCase";
import { boardModel } from "../models/board";

export function addColumnAtTheEnd({ board, column }: columnUseCaseParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    if(column.position === '-1') {
        column.position = JSON.stringify(newBoard.columnList.length + 1)
    }
    newBoard.columnList.push(column)
    return newBoard
}

