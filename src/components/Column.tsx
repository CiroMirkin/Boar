import React, { useState } from "react";
import { columnModel } from "../models/column";
import { AllBoardData, UpdateBoardData } from "./Board";
import { TaskList } from "./Task";
import { isThisTheFirstColumn } from "../auxiliaryFunction/firstOrLastColumn";
import { taskOptions } from "../useCase/taskOptions";

export function ColumnList({ }) {
    const columns = React.useContext(AllBoardData).columnList
    const columnList: React.ReactNode[] = []

    columns.forEach(column => {
        columnList.push(
            <Column data={column} key={column.id}>
                <TaskList columnPosition={column.position} />
            </Column>
        )
    })

    return (
        <div>
            {columnList}
        </div>
    )
}

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    const [ newTaskDescription, setNewTaskDescription ] = useState('')
    const handleClick = () => {
        console.log(newTaskDescription)
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