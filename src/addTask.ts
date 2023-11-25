import { columnModel } from "./models/column";
import { taskModel } from "./models/task";

export const addTaskToFirstColumn = (columnList: columnModel[], task: taskModel): columnModel[] => {
    if(!(task.id).trim()) {
        throw 'No se puede agregar una tarea sin id'
    }
    if(columnList.length < 3) {
        throw "No puede haber menos de tres columnas"
    }
    
    columnList[0].taskList.push(task)
    return columnList
}