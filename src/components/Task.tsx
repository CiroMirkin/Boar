import React from "react";
import { taskModel } from "../models/task";
import { UpdateBoardData } from "./Board";
import { deleteThisTask } from "../useCase/deleteTask";
import { moveThisTaskToTheNextColumn, moveThisTaskToThePrevColumn } from "../useCase/moveTask";
import { boardActionParams, boardModel } from "../models/board";

interface TaskProps {
    data: taskModel
}

export function Task({ data }: TaskProps) {
    const updateBoard = React.useContext(UpdateBoardData)

    const handleClick = (action: ({ task, board }: boardActionParams) => boardModel) => {
        updateBoard({
            action,
            task: data
        })
    }

    return (
        <div>
            <p>{ data.descriptionText }</p>
            <button onClick={() => handleClick(deleteThisTask)}>Eliminar</button>
            <button onClick={() => handleClick(moveThisTaskToThePrevColumn)}>Retroceder</button>
            <button onClick={() => handleClick(moveThisTaskToTheNextColumn)}>Avanzar</button>
        </div>
    )
}