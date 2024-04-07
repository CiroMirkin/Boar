import { taskList } from "@/models/task";

interface deleteLastTaskListParams {
    taskListInEachColumn: taskList[];
}

export const deleteLastTaskList = ({ taskListInEachColumn }: deleteLastTaskListParams): taskList[] => {
    if(taskListInEachColumn.length > 1) {
        taskListInEachColumn[taskListInEachColumn.length-1] = []
    }
    return taskListInEachColumn
}