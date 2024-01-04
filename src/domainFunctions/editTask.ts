import { columnModel } from "../models/column";

export const getTheColumnIndexWhereIsTheTask = (columns: columnModel[], taskId: string): number => {
    let columnIndex = -1
    columns.forEach((column: columnModel, index) => {
        const task = column.taskList.find(task => task.id === taskId)
        if(task) columnIndex = index
    })
    return columnIndex
}

interface editThisTaskParams {
    taskId: string,
    newTaskText?: string,
    columns: columnModel[]
}

export const editThisTask = ({ taskId, newTaskText, columns }: editThisTaskParams): columnModel[] => {
    const columnIndexWhereIsTheTask = getTheColumnIndexWhereIsTheTask(columns, taskId)
    const doesTheTaskExist = columnIndexWhereIsTheTask >= 0
    if(doesTheTaskExist) {
        const newColumns = [...columns]
        newColumns[columnIndexWhereIsTheTask].taskList = newColumns[columnIndexWhereIsTheTask].taskList.map(task => {
            return taskId === task.id 
            ? {
                id: task.id,
                descriptionText: !!newTaskText ? newTaskText : task.descriptionText
            } 
            : task
        })
        return newColumns
    }
    throw 'No se encontró la tarea en ninguna columna'
}