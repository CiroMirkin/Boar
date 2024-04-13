import { taskList } from "@/models/task";
import { TaskListInEachColumn } from "@/models/taskListInEachColumn";

interface deleteLastTaskListParams {
    taskListInEachColumn: taskList[];
}

export const deleteLastTaskList = ({ taskListInEachColumn }: deleteLastTaskListParams): taskList[] => {
    if(taskListInEachColumn.length > 1) {
        taskListInEachColumn[taskListInEachColumn.length-1] = []
    }
    return taskListInEachColumn
}
export const deleteTheTaskListInThisIndex = ({ index, taskListInEachColumn }: { index: number, taskListInEachColumn: TaskListInEachColumn }): TaskListInEachColumn => {
    const newTaskListInEachColumn = taskListInEachColumn.filter((taskList, taskListIndex) => {
        if(taskListIndex === index) {
            return false;
        }
        return true;
    })
    return newTaskListInEachColumn
}