import { getIndexOfColumnInColumnList } from "@/models/column"
import { taskUseCaseParams } from "../useCase"
import { getNewTask, taskList } from "@/models/task"

export type moveToType = 'next-column' | 'prev-column'

interface moveTaskParams extends taskUseCaseParams {
    to: moveToType,
}

export const moveThisTask = ({ task, to, taskListInEachColumn }: moveTaskParams): taskList[] => {
    const newTaskListInEachColumn = taskListInEachColumn
    const indexOfTheColumnWhereTheTaskIs: number = getIndexOfColumnInColumnList(task.columnPosition);
    let oldTaskIndexInList = 0;

    newTaskListInEachColumn[indexOfTheColumnWhereTheTaskIs] = newTaskListInEachColumn[indexOfTheColumnWhereTheTaskIs].filter((t, index) => {
        if (t.id === task.id) {
            oldTaskIndexInList = index;
            return false;
        }
        return true;
    })

    const nextColumnIndex = indexOfTheColumnWhereTheTaskIs + 1
    const prevColumnIndex = indexOfTheColumnWhereTheTaskIs - 1
    const indexOfTheColumnWhereTheTaskWillBe = (to === 'next-column') ? nextColumnIndex : prevColumnIndex 
    if(indexOfTheColumnWhereTheTaskWillBe < newTaskListInEachColumn.length && indexOfTheColumnWhereTheTaskWillBe > -1) {
        const newTask = getNewTask({
            descriptionText: task.descriptionText,
            columnPosition: `${indexOfTheColumnWhereTheTaskWillBe + 1}`
        })
        newTask.id = task.id 
        
        newTaskListInEachColumn[indexOfTheColumnWhereTheTaskWillBe].push(newTask)

        return newTaskListInEachColumn
    } 

    const itemsToBeRemovedOrReplaced = 0
    newTaskListInEachColumn[indexOfTheColumnWhereTheTaskIs].splice(
        oldTaskIndexInList, 
        itemsToBeRemovedOrReplaced, 
        task
    )
    return taskListInEachColumn
}

export const moveThisTaskToTheNextColumn = ({ task, taskListInEachColumn }: taskUseCaseParams): taskList[] => {
    return moveThisTask({ task, to: 'next-column', taskListInEachColumn })
}
export const moveThisTaskToThePrevColumn = ({ task, taskListInEachColumn }: taskUseCaseParams): taskList[] => {
    return moveThisTask({ task, to: 'prev-column', taskListInEachColumn })
}
