import React, { useState } from "react";
import { columnModel } from "../models/column";
import { UpdateBoardData } from "./Board";
import { isThisTheFirstColumn } from "../auxiliaryFunction/firstOrLastColumn";
import './Column.css'
import { addTaskInFirstColumn } from "../useCase/addTaskInFirstColumn";

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    const [ newTaskDescription, setNewTaskDescription ] = useState('')
    
    const updateBoard = React.useContext(UpdateBoardData)
    const handleClick = () => {
        const task = {
            id: crypto.randomUUID(),
            descriptionText: newTaskDescription.trim(),
            columnPosition: '1',
            highlight: false
        }
        updateBoard({
            action: addTaskInFirstColumn,
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