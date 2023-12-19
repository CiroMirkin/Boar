import { columnModel } from "./models/column"
import { taskModel } from "./models/task"

export type moveToType = 'next-column' | 'prev-column'
type columnsType = columnModel[]

interface moveTaskParams {
    taskId: string,
    to: moveToType,
    columns: columnsType
}

export const moveTask = ({ taskId, to, columns }: moveTaskParams): columnsType => {
    let columnIndexOfTheTask: number = 0;
    let taskIndex: number = 0;
    let task: taskModel = { descriptionText: "", id: "" }

    const newColumns = columns.map((column, columnIndex) => {
        column.taskList = column.taskList.filter((taskInColumn, taskInColumnIndex) => {
            if(taskInColumn.id !== taskId) {
                return taskInColumn
            }
            taskIndex = taskInColumnIndex
            columnIndexOfTheTask = columnIndex
            task = taskInColumn
        })
        return column
    })

    const nextColumnIndex = columnIndexOfTheTask + 1
    const prevColumnIndex = columnIndexOfTheTask - 1
    const columnIndexWhereTheTaskWillBe = (to === 'next-column') ? nextColumnIndex : prevColumnIndex 
    if(columnIndexWhereTheTaskWillBe < columns.length && columnIndexWhereTheTaskWillBe > -1) {
        const SpliceMethodParamToInsertAnElementWithoutDeletingElements = 0
        newColumns[columnIndexWhereTheTaskWillBe].taskList.splice(
            taskIndex, 
            SpliceMethodParamToInsertAnElementWithoutDeletingElements, 
            task
        )
        return newColumns
    } 
    const SpliceMethodParamToInsertAnElementWithoutDeletingElements = 0
    newColumns[columnIndexOfTheTask].taskList.splice(
        taskIndex, 
        SpliceMethodParamToInsertAnElementWithoutDeletingElements, 
        task
    )
    return newColumns
}