import { getIndexOfColumnInColumnList } from "../../utility/indexOfColumn"
import { boardModel } from "../../models/board"
import { taskUseCaseParams } from "../useCase"
import { taskList } from "@/models/task"

export type moveToType = 'next-column' | 'prev-column'

interface moveTaskParams extends taskUseCaseParams {
    to: moveToType,
}

export const moveThisTask = ({ task, to, taskListInEachColumn }: moveTaskParams): taskList[] => {
    const newTaskListInEachColumn = structuredClone(taskListInEachColumn)
    const indexOfTheColumnWhereTheTaskIs: number = getIndexOfColumnInColumnList(task.columnPosition);

    newTaskListInEachColumn[indexOfTheColumnWhereTheTaskIs] = newTaskListInEachColumn[indexOfTheColumnWhereTheTaskIs].filter(t => t.id !== task.id)

    const nextColumnIndex = indexOfTheColumnWhereTheTaskIs + 1
    const prevColumnIndex = indexOfTheColumnWhereTheTaskIs - 1
    const indexOfTheColumnWhereTheTaskWillBe = (to === 'next-column') ? nextColumnIndex : prevColumnIndex 
    if(indexOfTheColumnWhereTheTaskWillBe < newTaskListInEachColumn.length && indexOfTheColumnWhereTheTaskWillBe > -1) {
        task.columnPosition = `${indexOfTheColumnWhereTheTaskWillBe + 1}`
        newTaskListInEachColumn[indexOfTheColumnWhereTheTaskWillBe].push(task)

        return newTaskListInEachColumn
    } 

    return taskListInEachColumn
}

export const moveThisTaskToTheNextColumn = ({ task, board }: taskUseCaseParams): boardModel => {
    return moveThisTask({ task, to: 'next-column', board })
}
export const moveThisTaskToThePrevColumn = ({ task, board }: taskUseCaseParams): boardModel => {
    return moveThisTask({ task, to: 'prev-column', board })
}
