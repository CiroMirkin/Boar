import { taskModel } from "../models/task"

interface setThisTaskAsHighlightedTaskParams {
    task: taskModel
}

export const setThisTaskAsHighlightedTask = ({ task }: setThisTaskAsHighlightedTaskParams): taskModel => {
    const newTask = {...task};
    if(newTask.highlight) {
        newTask.highlight = false
        return newTask
    }
    newTask.highlight = true
    return newTask
}