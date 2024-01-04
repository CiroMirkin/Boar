import { columnModel } from "../models/column";
import { taskModel } from "../models/task";

interface editThisTaskParams {
    taskId: string,
    newTaskText?: string,
    columns: columnModel[]
}

export const editThisTask = ({ taskId, newTaskText, columns }: editThisTaskParams): columnModel[] => {
    const newColumns = [...columns].map(column => {
        const newColumn = column
        newColumn.taskList = newColumn.taskList.map(task => {
            if(taskId === task.id) {
                const createNewTask = (taskId: string): taskModel => ({
                    id: taskId,
                    descriptionText: !!newTaskText ? newTaskText : task.descriptionText
                })
                return createNewTask(taskId)
            }
            return task
        })
        return newColumn
    })
    return newColumns
}