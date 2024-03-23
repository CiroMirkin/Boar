import { getIndexOfColumnInColumnList } from "../../utility/indexOfColumn"
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

export const moveThisTaskToTheNextColumn = ({ task, taskListInEachColumn }: taskUseCaseParams): taskList[] => {
    return moveThisTask({ task, to: 'next-column', taskListInEachColumn })
}
export const moveThisTaskToThePrevColumn = ({ task, taskListInEachColumn }: taskUseCaseParams): taskList[] => {
    return moveThisTask({ task, to: 'prev-column', taskListInEachColumn })
}
