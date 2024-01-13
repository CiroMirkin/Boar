import { taskModel } from "../models/task"

interface setThisTaskAsHighlightedTaskParams {
    task: taskModel
}

export const setThisTaskAsHighlightedTask = ({ task }: setThisTaskAsHighlightedTaskParams): taskModel => {
    const newTask = {...task};
    newTask.highlight = true
    return newTask
}