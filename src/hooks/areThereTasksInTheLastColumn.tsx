import { TaskListInEachColumnContext } from "@/components/board/Board"
import { useContext } from "react"

export const useCheckForTasksInLastColumn = (): boolean => {
    const taskListInEachColumn = useContext(TaskListInEachColumnContext)
    const taskListInTheLastColumn = taskListInEachColumn[taskListInEachColumn.length-1]
    return !taskListInTheLastColumn.length
}