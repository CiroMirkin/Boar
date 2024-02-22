import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardActionParams, boardModel } from "../models/board";

export function addTaskInFirstColumn({ board, task }: boardActionParams): boardModel {
    const columnIndex = 0
    board.columnList[columnIndex].taskList.push(task)
    const newBoard = getCopyOfTheBoardData(board)
    return newBoard
}