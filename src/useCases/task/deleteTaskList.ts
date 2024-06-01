import { TaskListInEachColumn } from "@/models/taskList";

interface deleteLastTaskListParams {
    taskListInEachColumn: TaskListInEachColumn;
}

export const cleanLastTaskList = ({ taskListInEachColumn }: deleteLastTaskListParams): TaskListInEachColumn => {
    if(taskListInEachColumn.length > 1) {
        taskListInEachColumn[taskListInEachColumn.length-1] = []
    }
    return taskListInEachColumn
}
export const deleteTheTaskListInThisIndex = ({ index, taskListInEachColumn }: { index: number, taskListInEachColumn: TaskListInEachColumn }): TaskListInEachColumn => {
    const newTaskListInEachColumn = taskListInEachColumn.filter(taskList => taskListInEachColumn.indexOf(taskList) !== index)
    return newTaskListInEachColumn
}