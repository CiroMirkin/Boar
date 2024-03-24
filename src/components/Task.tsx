import React, { createContext } from "react";
import { taskModel, taskNull } from "../models/task";
import { deleteTask, moveTaskToNextColumn, moveTaskToPrevColumn } from "@/redux/taskListInEachColumnReducer";
import { useDispatch } from "react-redux";

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
        <div className="actions">
            <button onClick={() => handleClick(deleteTaskAction())}>Eliminar</button>
            <button onClick={() => handleClick(moveTaskToPrevColumnAction())}>Retroceder</button>
            <button onClick={() => handleClick(moveTaskToNextColumnAction())}>Avanzar</button>
        </div>
    )
}

Task.TaskDescription = TaskDescription
Task.TaskActions = TaskActions