import BusinessError from "@/errors/businessError";
import { taskModel } from "./task";

export type TaskList = taskModel[]
export type TaskListInEachColumn = TaskList[]

export const emptyTaskListInEachColumn: TaskListInEachColumn = [[], [], []]

const taskListLimit = 14
const lastTaskListLimit = 30 // Deberia ser igual a la constante dailyArchiveLimit

export const isThisTaskListWithinTheLimit = ({ taskList }: { taskList: TaskList }): true | BusinessError => {
    if(taskList.length > taskListLimit) throw new BusinessError('La columna esta llena.')
    return true
}

export const isThisLastTaskListWithinTheLimit = ({ taskList }: { taskList: TaskList }): true | BusinessError => {
    if(taskList.length > lastTaskListLimit) throw new BusinessError('La columna esta llena.')
    return true
}