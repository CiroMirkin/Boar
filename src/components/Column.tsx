import React, { useState } from "react";
import { columnModel } from "../models/column";
import { AllBoardData, UpdateBoardData } from "./Board";
import { isThisTheFirstColumn, isThisTheLastColumn } from "../auxiliaryFunction/firstOrLastColumn";
import './Column.css'
import { addTaskInFirstColumn } from "../useCase/addTaskInFirstColumn";
import { archiveTaskListInTheLastColumn } from "../useCase/archiveTaskList";
import { taskNull } from "../models/task";

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    const [ newTaskDescription, setNewTaskDescription ] = useState('')
    const board = React.useContext(AllBoardData)
    
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
            {
                isThisTheLastColumn(data, board.columnList) 
                && <button  
                    onClick={() => updateBoard({
                        action: archiveTaskListInTheLastColumn,
                        task: taskNull
                    })}
                    >Archivar tareas</button>
            }
        </div>
    )
}