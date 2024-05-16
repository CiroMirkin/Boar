import { TaskListInEachColumn } from "@/models/taskList"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

export const useTaskListInEachColumn = (): TaskListInEachColumn => {
    return useSelector((state: RootState) => state.taskListInEachColumn.list)
}