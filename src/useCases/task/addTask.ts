import { TaskListInEachColumn } from "@/models/taskListInEachColumn";
import { taskUseCaseParams } from "../useCase";
import { getIndexOfColumnInColumnList } from "@/models/column";

export function addTaskInFirstColumn({ taskListInEachColumn: taskList, task }: taskUseCaseParams): TaskListInEachColumn {
    const columnPosition = 0
    taskList[columnPosition].push(task)
    return taskList
}

export function addTaskInTheLastColumn({ taskListInEachColumn, task }: taskUseCaseParams): TaskListInEachColumn {
    const columnIndex = getIndexOfColumnInColumnList(task.columnPosition)
    taskListInEachColumn[columnIndex].push(task)
    return taskListInEachColumn
}