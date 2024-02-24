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
    // Este arreglo es necesario porque la referencia de las taskList dentro de las columnas no cambia
    // Por ende cuando se elimina la tarea se elimina de newBoard y de board
    const oldColumnTaskList = [...newBoard.columnList[indexOfTheColumnWhereTheTaskIs].taskList]

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

    board.columnList[indexOfTheColumnWhereTheTaskIs].taskList = oldColumnTaskList
    return board
}

export const moveThisTaskToTheNextColumn = ({ task, board }: boardActionParams): boardModel => {
    return moveThisTask({ task, to: 'next-column', board })
}
export const moveThisTaskToThePrevColumn = ({ task, board }: boardActionParams): boardModel => {
    return moveThisTask({ task, to: 'prev-column', board })
}
