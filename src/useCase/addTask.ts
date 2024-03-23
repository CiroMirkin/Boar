import { taskList } from "@/models/task";
import { taskUseCaseParams } from "./useCase";

export function addTaskInFirstColumn({ taskList, task }: taskUseCaseParams): taskList[] {
    const columnPosition = 0
    taskList[columnPosition].push(task)
    return taskList
}