import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { columnUseCaseParams } from "./useCase";
import { boardModel } from "../models/board";
import { columnModel } from "../models/column";

export function addColumnAtTheEnd({ board, column }: columnUseCaseParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    if(column.position === '-1') {
        column.position = JSON.stringify(newBoard.columnList.length + 1)
    }
    newBoard.columnList.push(column)
    return newBoard
}

export function createColumnWithoutPosition({ name }: { name: string }): columnModel {
    return {
        id: crypto.randomUUID(),
        position: '-1',
        name,
        taskList: []
    }
}