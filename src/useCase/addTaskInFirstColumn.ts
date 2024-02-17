import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardModel } from "../models/board";
import { taskModel } from "../models/task";

interface addTaskInFirstColumnParams {
    board: boardModel
    task: taskModel
}

export function addTaskInFirstColumn({ board, task }: addTaskInFirstColumnParams): boardModel {
    const columnIndex = 0
    board.tasksInColumns[columnIndex].push(task)
    const newBoard = getCopyOfTheBoardData(board)
    return newBoard
}