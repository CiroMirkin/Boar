import { columnModel } from "./models/column"
import { taskModel } from "./models/task"

type moveToType = 'next-column' | 'prev-column'
type columnsType = columnModel[]

interface moveTaskParams {
    task: taskModel,
    to: moveToType,
    columns: columnsType
}

export const moveTask = ({ task, to, columns }: moveTaskParams): columnsType => {
    let indexOfColumnWhereIsTheTask = -1;
    let taskIndex: number = 1;
    const newColumns = columns.map((column, columnIndex) => {
        const newColumn = column
        newColumn.taskList = column.taskList.filter((taskInColumn, taskInColumnIndex) => {
            if(taskInColumn.id !== task.id) {
                return taskInColumn
            }
            taskIndex = taskInColumnIndex
            indexOfColumnWhereIsTheTask = columnIndex
        })
        return newColumn
    })

    const nextColumnIndex = indexOfColumnWhereIsTheTask + 1
    const prevColumnIndex = indexOfColumnWhereIsTheTask - 1
    const columnIndexWhereItWillBeTheTask = (to === 'next-column') ? nextColumnIndex : prevColumnIndex 
    if(columnIndexWhereItWillBeTheTask < columns.length && columnIndexWhereItWillBeTheTask > -1) {
        const numericalParameterOfTheSpliceMethodToInsertAnElementWithoutDeletingElements = 0
        newColumns[columnIndexWhereItWillBeTheTask].taskList.splice(
            taskIndex, 
            numericalParameterOfTheSpliceMethodToInsertAnElementWithoutDeletingElements, 
            task
        )
        return newColumns
    } 
    const numericalParameterOfTheSpliceMethodToInsertAnElementWithoutDeletingElements = 0
    newColumns[indexOfColumnWhereIsTheTask].taskList.splice(
        taskIndex, 
        numericalParameterOfTheSpliceMethodToInsertAnElementWithoutDeletingElements, 
        task
    )
    return newColumns
}