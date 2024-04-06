import { taskList } from "@/models/task";
import { taskUseCaseParams } from "../useCase";

export function addTaskInFirstColumn({ taskListInEachColumn: taskList, task }: taskUseCaseParams): taskList[] {
    const columnPosition = 0
    if(taskList[columnPosition].length > 15) throw new Error('Ya tienes muchas tareas en esta columna.')
    taskList[columnPosition].push(task)
    return taskList
}