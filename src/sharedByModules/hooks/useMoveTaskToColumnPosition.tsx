import { taskModel } from "@/modules/taskList/models/task"
import { moveThisTaskToThisColumnPosition } from "@/modules/taskList/state/taskListInEachColumnReducer"
import { useDispatch } from "react-redux"

interface moveTaskToColumnPositionParams { 
    task: taskModel, 
    columnPosition: string 
}

export const useMoveTaskToColumnPosition = () => {
    const dispatch = useDispatch()

    return ({ task, columnPosition }: moveTaskToColumnPositionParams) => {
        dispatch(moveThisTaskToThisColumnPosition({
            task,
            newColumnPosition: columnPosition
        }))
    }
} 