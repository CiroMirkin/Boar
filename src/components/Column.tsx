import React, { useState } from "react";
import { columnModel } from "../models/column";
import { BoardData } from "../App";
import { isThisTheFirstColumn, isThisTheLastColumn } from "../auxiliaryFunction/firstOrLastColumn";
import './Column.css'
import { addTaskInFirstColumn } from "../useCase/addTask";
import { archiveTaskListInTheLastColumn } from "../useCase/archiveTaskList";
import { taskNull } from "../models/task";

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    const [ newTaskDescription, setNewTaskDescription ] = useState('')
    const board = React.useContext(BoardData).board

    const updateBoard = React.useContext(BoardData).update
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
            <footer>
                {
                    isThisTheFirstColumn(data) 
                    && <div>
                        <input 
                            type="text" value={newTaskDescription} 
                            onChange={(e) => setNewTaskDescription(e.target.value)}  
                        />
                        <button onClick={handleClick}>Añadir</button>
                    </div>
                    
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
            </footer>
        </div>
    )
}