import { taskModel } from "../../models/task"
import { TaskListInEachColumn } from "../../models/taskList"
import { Tag } from "../../Tags/model/tags"

interface addTagInThisTaskParams {
    taskListByColumns: TaskListInEachColumn
    task: taskModel
    tags: Tag[]
}

export const addTagInThisTask = ({ taskListByColumns, tags, task }: addTagInThisTaskParams): TaskListInEachColumn => {
    const newTaskListByColumns = taskListByColumns.map(taskList => {
        return taskList.map(taskInList => {
            if(taskInList.id == task.id) {
                taskInList = {
                    ...task,
                    tags
                }
            }
            return taskInList
        })
    })
    return newTaskListByColumns
}