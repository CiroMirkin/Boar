import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardModel } from "../models/board";
import { taskList } from "../models/task";

interface archiveTaskListParams {
    board: boardModel,
    columnIndex: number
}
export function archiveTaskListInColumn({ board, columnIndex }: archiveTaskListParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)

    const date = new Date().toDateString()
    const taskListToArchive: taskList = structuredClone(newBoard.columnList[columnIndex].taskList)
    newBoard.archive.push({
        date,
        tasklist: taskListToArchive
    })
    
    newBoard.columnList[columnIndex].taskList = []

    return newBoard
}