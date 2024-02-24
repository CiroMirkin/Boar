import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData"
import { getIndexOfColumnInColumnList } from "../auxiliaryFunction/indexOfColumn"
import { boardActionParams, boardModel } from "../models/board"
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
    const indexOfTheColumnWhereTheTaskIs: number = getIndexOfColumnInColumnList(task.columnPosition);

    newBoard.columnList[indexOfTheColumnWhereTheTaskIs].taskList = newBoard.columnList[indexOfTheColumnWhereTheTaskIs].taskList.filter(t => t.id !== task.id)

    const nextColumnIndex = indexOfTheColumnWhereTheTaskIs + 1
    const prevColumnIndex = indexOfTheColumnWhereTheTaskIs - 1
    const columnIndexWhereTheTaskWillBe = (to === 'next-column') ? nextColumnIndex : prevColumnIndex 
    if(columnIndexWhereTheTaskWillBe < newColumns.length && columnIndexWhereTheTaskWillBe > -1) {
        task.columnPosition = newColumns[columnIndexWhereTheTaskWillBe].position
        newColumns[columnIndexWhereTheTaskWillBe].taskList.push(task)
        newBoard.columnList = newColumns

        return newBoard
    } 
    return board
}

export const moveThisTaskToTheNextColumn = ({ task, board }: boardActionParams): boardModel => {
    return moveThisTask({ task, to: 'next-column', board })
}
export const moveThisTaskToThePrevColumn = ({ task, board }: boardActionParams): boardModel => {
    return moveThisTask({ task, to: 'prev-column', board })
}
