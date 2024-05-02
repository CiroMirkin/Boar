import { TaskList } from "@/models/taskList";
import { TaskListInEachColumn } from "@/models/taskList";

interface deleteLastTaskListParams {
    taskListInEachColumn: TaskList[];
}

export const cleanLastTaskList = ({ taskListInEachColumn }: deleteLastTaskListParams): TaskList[] => {
    if(taskListInEachColumn.length > 1) {
        taskListInEachColumn[taskListInEachColumn.length-1] = []
    }
    return taskListInEachColumn
}
export const deleteTheTaskListInThisIndex = ({ index, taskListInEachColumn }: { index: number, taskListInEachColumn: TaskListInEachColumn }): TaskListInEachColumn => {
    const newTaskListInEachColumn = taskListInEachColumn.filter(taskList => taskListInEachColumn.indexOf(taskList) !== index)
    return newTaskListInEachColumn
}