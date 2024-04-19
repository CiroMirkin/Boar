import { TaskList } from "@/models/taskListInEachColumn";
import { taskUseCaseParams } from "../useCase";

export function addTaskInFirstColumn({ taskListInEachColumn: taskList, task }: taskUseCaseParams): TaskList[] {
    const columnPosition = 0
    taskList[columnPosition].push(task)
    return taskList
}