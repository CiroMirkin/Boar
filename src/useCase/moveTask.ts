import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData"
import { getIndexOfColumnInColumnList } from "../auxiliaryFunction/indexOfColumn"
import { boardModel } from "../models/board"
import { taskModel } from "../models/task"

export type moveToType = 'next-column' | 'prev-column'

interface moveTaskParams {
    task: taskModel,
    to: moveToType,
    board: boardModel
}

export const moveThisTask = ({ task, to, board }: moveTaskParams): boardModel => {
    const newColumns = board.columnList
    const newBoard = getCopyOfTheBoardData(board)
    let columnIndexOfTheTask: number = getIndexOfColumnInColumnList(task.columnPosition);

    newBoard.columnList[columnIndexOfTheTask].taskList = newBoard.columnList[columnIndexOfTheTask].taskList.filter(t => t.id !== task.id)

    const nextColumnIndex = columnIndexOfTheTask + 1
    const prevColumnIndex = columnIndexOfTheTask - 1
    const columnIndexWhereTheTaskWillBe = (to === 'next-column') ? nextColumnIndex : prevColumnIndex 
    if(columnIndexWhereTheTaskWillBe < newColumns.length && columnIndexWhereTheTaskWillBe > -1) {
        task.columnPosition = newColumns[columnIndexWhereTheTaskWillBe].position
        newColumns[columnIndexWhereTheTaskWillBe].taskList.push(task)
        newBoard.columnList = newColumns

        return newBoard
    } 
    return board
}

