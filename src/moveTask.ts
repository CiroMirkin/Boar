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
    let columnIndexOfTheTask = -1;
    let taskIndex: number = 1;

    const newColumns = columns.map((column, columnIndex) => {
        column.taskList = column.taskList.filter((taskInColumn, taskInColumnIndex) => {
            if(taskInColumn.id !== task.id) {
                return taskInColumn
            }
            taskIndex = taskInColumnIndex
            columnIndexOfTheTask = columnIndex
        })
        return column
    })

    const nextColumnIndex = columnIndexOfTheTask + 1
    const prevColumnIndex = columnIndexOfTheTask - 1
    const columnIndexWhereTheTaskWillBe = (to === 'next-column') ? nextColumnIndex : prevColumnIndex 
    if(columnIndexWhereTheTaskWillBe < columns.length && columnIndexWhereTheTaskWillBe > -1) {
        const numericalParameterOfTheSpliceMethodToInsertAnElementWithoutDeletingElements = 0
        newColumns[columnIndexWhereTheTaskWillBe].taskList.splice(
            taskIndex, 
            numericalParameterOfTheSpliceMethodToInsertAnElementWithoutDeletingElements, 
            task
        )
        return newColumns
    } 
    const numericalParameterOfTheSpliceMethodToInsertAnElementWithoutDeletingElements = 0
    newColumns[columnIndexOfTheTask].taskList.splice(
        taskIndex, 
        numericalParameterOfTheSpliceMethodToInsertAnElementWithoutDeletingElements, 
        task
    )
    return newColumns
}