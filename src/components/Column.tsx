import React, { useState } from "react";
import { columnModel } from "../models/column";
import { AllBoardData, UpdateBoardData } from "./Board";
import { isThisTheFirstColumn } from "../auxiliaryFunction/firstOrLastColumn";
import { addTaskToFirstColumAction } from "../useCase/taskOptions";

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    const [ newTaskDescription, setNewTaskDescription ] = useState('')
    
    const updateBoard = React.useContext(UpdateBoardData)
    const board = React.useContext(AllBoardData)
    const handleClick = () => {
        const task = {
            id: crypto.randomUUID(),
            descriptionText: newTaskDescription.trim(),
            columnPosition: '1',
            highlight: false
        }
        updateBoard({
            action: addTaskToFirstColumAction.action,
            task
        })
        setNewTaskDescription('')
    }

    return (
        <div>
            <h3>{ data.name }</h3>
            { children }
            {
                isThisTheFirstColumn(data) 
                && <footer>
                    <input 
                        type="text" value={newTaskDescription} 
                        onChange={(e) => setNewTaskDescription(e.target.value)}  
                    />
                    <button onClick={handleClick}>Añadir</button>
                </footer>
            }
        </div>
    )
}