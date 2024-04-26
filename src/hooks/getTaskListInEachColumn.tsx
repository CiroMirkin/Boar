import { TaskListInEachColumn } from "@/models/taskListInEachColumn"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

export const useTaskListInEachColumn = (): TaskListInEachColumn => {
    return useSelector((state: RootState) => state.taskListInEachColumn.list)
}