import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData"
import { getIndexOfColumnInColumnList } from "../auxiliaryFunction/indexOfColumn"
import { boardModel } from "../models/board"
import { taskUseCaseParams } from "./useCase"
import { taskModel } from "../models/task"

export type moveToType = 'next-column' | 'prev-column'

interface moveTaskParams {
    task: taskModel,
    to: moveToType,
    board: boardModel
}

export const moveThisTask = ({ task, to, board }: moveTaskParams): boardModel => {
    const newBoard = getCopyOfTheBoardData(board)
    const newColumns = newBoard.columnList
    const indexOfTheColumnWhereTheTaskIs: number = getIndexOfColumnInColumnList(task.columnPosition);

    newBoard.columnList[indexOfTheColumnWhereTheTaskIs].taskList = newBoard.columnList[indexOfTheColumnWhereTheTaskIs].taskList.filter(t => t.id !== task.id)

    const nextColumnIndex = indexOfTheColumnWhereTheTaskIs + 1
    const prevColumnIndex = indexOfTheColumnWhereTheTaskIs - 1
    const indexOfTheColumnWhereTheTaskWillBe = (to === 'next-column') ? nextColumnIndex : prevColumnIndex 
    if(indexOfTheColumnWhereTheTaskWillBe < newColumns.length && indexOfTheColumnWhereTheTaskWillBe > -1) {
        task.columnPosition = newColumns[indexOfTheColumnWhereTheTaskWillBe].position
        newColumns[indexOfTheColumnWhereTheTaskWillBe].taskList.push(task)
        newBoard.columnList = newColumns

        return newBoard
    } 

    return board
}

export const moveThisTaskToTheNextColumn = ({ task, board }: taskUseCaseParams): boardModel => {
    return moveThisTask({ task, to: 'next-column', board })
}
export const moveThisTaskToThePrevColumn = ({ task, board }: taskUseCaseParams): boardModel => {
    return moveThisTask({ task, to: 'prev-column', board })
}
