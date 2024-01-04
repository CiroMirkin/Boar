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
                const createTheNewTaskFrom = (task: taskModel): taskModel => ({
                    id: task.id,
                    descriptionText: !!newTaskText ? newTaskText : task.descriptionText
                })
                return createTheNewTaskFrom(task)
            }
            return task
        })
        return newColumn
    })
    return newColumns
}