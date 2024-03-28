import React from "react"
import { addColumnAtTheEnd } from "../useCase/column/addColumn"
import { defaultColumnList, getBlankColumnWithoutPosition } from "../models/column"
import { deleteThisColumn } from "../useCase/column/deleteColumn"
import { columnModel } from "../models/column"
import { boardModel } from "@/models/board"

interface ConfigBoardParams {
    columnList: columnModel[]
    boardData: boardModel
}

export function ConfigBoard({ boardData, columnList }:ConfigBoardParams) {
    const updateBoardData = (p: any) => p
    
    const getNewColumn = () => getBlankColumnWithoutPosition({ name: 'Nueva columna'})

    const handleClick = (action: Function, column: columnModel) => {
        try {
            updateBoardData({ action, column })
        }
        catch (error) {
            console.log(error) 
        }
    }

    const columnsContent: React.ReactNode[] = columnList.map(column => 
        <button onClick={() => handleClick(deleteThisColumn, column)}>Eliminar</button>
    ) 

    const columns: React.ReactNode[] = columnList.map(column =>
        <li key={column.id}>
            <h4>{column.name}</h4>
            <button onClick={() => handleClick(deleteThisColumn, column)}>Eliminar</button>
        </li>
    )
    return (
        <>
            <h1>Preferencias</h1>
            <div>
                <h2>{boardData.name}</h2>
            </div>
            <ul>
                { columns }
                <li><button onClick={() => handleClick(addColumnAtTheEnd, getNewColumn())}>Nueva columna</button></li>
            </ul>
        </>
    )
}