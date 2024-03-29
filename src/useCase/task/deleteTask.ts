import { getIndexOfColumnInColumnList } from "../../utility/indexOfColumn";
import { taskUseCaseParams } from "../useCase";
import { taskList } from "@/models/task";

export function deleteThisTask({ taskListInEachColumn, task }: taskUseCaseParams): taskList[] {
    const taskId = task.id
    const columnIndex = getIndexOfColumnInColumnList(task.columnPosition)
    
    const newTaskListInEachColumn = taskListInEachColumn.map((taskList, index) => {
        if(index === columnIndex) {
            const newTaskListInColumn = taskList.filter(task => task.id !== taskId)
            return newTaskListInColumn
        }
        return taskList
    })

    return newTaskListInEachColumn
}