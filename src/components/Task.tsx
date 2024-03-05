import React, { createContext } from "react";
import { taskModel, taskNull } from "../models/task";
import { UpdateBoardData } from "../App";
import { deleteThisTask } from "../useCase/deleteTask";
import { moveThisTaskToTheNextColumn, moveThisTaskToThePrevColumn } from "../useCase/moveTask";
import { boardActionFunction } from "../models/board";

const TaskContext = createContext(taskNull)

interface TaskProps {
    data: taskModel
}

export function Task({ data }: TaskProps) {
    const updateBoard = React.useContext(UpdateBoardData)

    const handleClick = (action: boardActionFunction) => {
        updateBoard({
            action,
            task: data
        })
    }

    return (
        <TaskContext.Provider value={ data }>
            <TaskDescription description={data.descriptionText} />
            <button onClick={() => handleClick(deleteThisTask)}>Eliminar</button>
            <button onClick={() => handleClick(moveThisTaskToThePrevColumn)}>Retroceder</button>
            <button onClick={() => handleClick(moveThisTaskToTheNextColumn)}>Avanzar</button>
        </TaskContext.Provider>
    )
}

function TaskDescription({ description }: { description: string }) {
    return (
        <p>{ description }</p>
    )
}