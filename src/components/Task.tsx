import React, { createContext } from "react";
import { taskModel, taskNull } from "../models/task";
import { deleteTask, moveTaskToNextColumn, moveTaskToPrevColumn } from "@/redux/taskListInEachColumnReducer";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";

const TaskContext = createContext(taskNull)

interface TaskProps {
    data: taskModel,
    children: React.ReactNode
}

export function Task({ data, children }: TaskProps) {
    return (
        <TaskContext.Provider value={ data }>
            { children }
        </TaskContext.Provider>
    )
}

function TaskDescription() {
    const description = React.useContext(TaskContext).descriptionText
    return (
        <p>{ description }</p>
    )
}

function TaskActions() {
    const data = React.useContext(TaskContext)
    const deleteTaskAction = () => deleteTask
    const moveTaskToNextColumnAction = () => moveTaskToNextColumn
    const moveTaskToPrevColumnAction = () => moveTaskToPrevColumn

    const dispatch = useDispatch()
    
    const handleClick = (action: Function) => {
        dispatch(action(data))
    }
    return (
        <div className="mt-4 flex justify-between gap-x-1 gap-y-1">
            <Button size="sm" onClick={() => handleClick(moveTaskToPrevColumnAction())}>Retroceder</Button>
            <Button size="sm" onClick={() => handleClick(moveTaskToNextColumnAction())}>Avanzar</Button>
            <Button size="sm" variant="destructiveGhost" onClick={() => handleClick(deleteTaskAction())}>Eliminar</Button>
        </div>
    )
}

Task.TaskDescription = TaskDescription
Task.TaskActions = TaskActions