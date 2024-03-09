import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardModel } from "../models/board";
import { taskActionParams } from "./useCase";

export function addTaskInFirstColumn({ board, task }: taskActionParams): boardModel {
    const columnIndex = 0
    board.columnList[columnIndex].taskList.push(task)
    const newBoard = getCopyOfTheBoardData(board)
    return newBoard
}