import { getCopyOfTheBoardData } from "../utility/copyBoardData";
import { boardModel } from "../models/board";
import { boardUseCaseParams } from "./useCase";
import { taskList } from "../models/task";
import { getFullDate } from "../utility/getTime";

export function archiveTaskListInTheLastColumn({ board }: boardUseCaseParams): boardModel {
    const columnIndex = Number(board.columnList.length) - 1
    return archiveTaskListInColumn({ board, columnIndex })
}

interface archiveTaskListParams {
    board: boardModel,
    columnIndex: number
}
export function archiveTaskListInColumn({ board, columnIndex }: archiveTaskListParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)

    const date = getFullDate()
    const taskListToArchive: taskList = structuredClone(newBoard.columnList[columnIndex].taskList)
    newBoard.archive.push({
        date,
        tasklist: taskListToArchive
    })
    
    newBoard.columnList[columnIndex].taskList = []

    return newBoard
}