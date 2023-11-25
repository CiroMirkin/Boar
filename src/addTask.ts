import { columnModel } from "./models/column";
import { taskModel } from "./models/task";

export const addTaskToThisColumn = (column: columnModel, task: taskModel): columnModel => {
    if(!(task.id).trim()) {
        throw 'No se puede agregar una tarea sin id'
    }
    
    column.taskList.push(task)
    return column
}