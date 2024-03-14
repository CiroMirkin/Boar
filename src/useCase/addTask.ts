import { boardModel } from "../models/board";
import { taskUseCaseParams } from "./useCase";

export function addTaskInFirstColumn({ board, task }: taskUseCaseParams): boardModel {
    const columnIndex = 0
    board.columnList[columnIndex].taskList.push(task)
    const newBoard = board
    return newBoard
}