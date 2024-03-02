import { format } from "@formkit/tempo";
import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { boardActionParams, boardModel } from "../models/board";
import { taskList } from "../models/task";

export function archiveTaskListInTheLastColumn({ board }: boardActionParams): boardModel {
    const columnIndex = Number(board.columnList.length) - 1
    return archiveTaskListInColumn({ board, columnIndex })
}

interface archiveTaskListParams {
    board: boardModel,
    columnIndex: number
}
export function archiveTaskListInColumn({ board, columnIndex }: archiveTaskListParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)

    const date = format(new Date(), { date: "full", time: "short" })
    const taskListToArchive: taskList = structuredClone(newBoard.columnList[columnIndex].taskList)
    newBoard.archive.push({
        date,
        tasklist: taskListToArchive
    })
    
    newBoard.columnList[columnIndex].taskList = []

    return newBoard
}