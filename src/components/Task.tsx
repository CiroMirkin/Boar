import React from "react";
import { taskModel } from "../models/task";
import { UpdateBoardData } from "./Board";
import { deleteThisTask } from "../useCase/deleteTask";

interface TaskProps {
    data: taskModel
}

export function Task({ data }: TaskProps) {
    const updateBoard = React.useContext(UpdateBoardData)

    const handleClick = () => {
        updateBoard({
            action: deleteThisTask,
            task: data
        })
    }

    return (
        <div>
            <p>{ data.descriptionText }</p>
            <button onClick={handleClick}>Eliminar</button>
        </div>
    )
}