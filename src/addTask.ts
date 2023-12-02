import { columnModel } from "./models/column";
import { taskModel } from "./models/task";

export const addTaskToThisColumn = (columnId: string, columns: columnModel[], task: taskModel): columnModel[] => {
    if(!(task.id).trim()) {
        throw 'No se puede agregar una tarea sin id'
    }
    const newColumns = columns.map(column => {
        if(column.id === columnId) {
            column.taskList.push(task)
        }
        return column
      })
    return newColumns
}