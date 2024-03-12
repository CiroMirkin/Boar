import React, { createContext } from "react";
import { taskModel, taskNull } from "../models/task";
import { BoardData } from "../App";
import { deleteThisTask } from "../useCase/deleteTask";
import { moveThisTaskToTheNextColumn, moveThisTaskToThePrevColumn } from "../useCase/moveTask";
import { boardActionFunction } from "../App";

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
    const updateBoard = React.useContext(BoardData).update
    const handleClick = (action: boardActionFunction) => {
        updateBoard({
            action,
            task: data
        })
    }
    return (
        <div className="actions">
            <button onClick={() => handleClick(deleteThisTask)}>Eliminar</button>
            <button onClick={() => handleClick(moveThisTaskToThePrevColumn)}>Retroceder</button>
            <button onClick={() => handleClick(moveThisTaskToTheNextColumn)}>Avanzar</button>
        </div>
    )
}

Task.TaskDescription = TaskDescription
Task.TaskActions = TaskActions