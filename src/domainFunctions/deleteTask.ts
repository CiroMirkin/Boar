import { columnModel } from "../models/column";

export const deleteThisTaskFromThisColumn = (taskId: string, columnId: string, columns: columnModel[]): columnModel[] => {
    if(!taskId.trim()) throw new Error('No se puede eliminar una tarea con un id en blanco')
    if(!columnId.trim()) throw new Error('No se puede eliminar una tarea de una columna con un id en blanco')

    const newColumns: columnModel[] = columns.map(column => {
        if(column.position === columnId) {
            if(column.taskList.length === 0) throw new Error('No se puede eliminar una tarea de una columna vacía')

            const newTaskListInColumn = column.taskList.filter(task => task.id !== taskId)
            column.taskList = newTaskListInColumn
            return column
        }
        return column
    })
    return newColumns
}