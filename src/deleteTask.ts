import { columnModel } from "./models/column";

export const delteTaskThisFromThisColumn = (taskId: string, columnId: string, columns: columnModel[]): columnModel[] => {
    const newColumns: columnModel[] = columns.map(column => {
        if(column.id === columnId) {
            const newTaskListInColumn = column.taskList.filter(task => task.id !== taskId)
            column.taskList = newTaskListInColumn
            return column
        }
        return column
    })
    return newColumns
}