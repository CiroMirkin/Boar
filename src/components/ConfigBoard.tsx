import React from "react"
import { getBlankColumnWithoutPosition } from "../models/column"
import { columnModel } from "../models/column"
import { boardModel } from "@/models/board"
import { useDispatch } from "react-redux"
import { addColumn, deleteColumn } from "@/redux/columnListReducer"

interface ConfigBoardParams {
    columnList: columnModel[]
    boardData: boardModel
}

export function ConfigBoard({ boardData, columnList }:ConfigBoardParams) {
    const updateBoardData = useDispatch()
    
    const getNewColumn = () => getBlankColumnWithoutPosition({ name: 'Nueva columna'})

    const handleClick = (action: Function, column: columnModel) => {
        try {
            updateBoardData(action(column))
        }
        catch (error) {
            console.log(error) 
        }
    }

    const columns: React.ReactNode[] = columnList.map(column =>
        <li key={column.id}>
            <h4>{column.name}</h4>
            <button onClick={() => handleClick(deleteColumn, column)}>Eliminar</button>
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
                <li><button onClick={() => handleClick(addColumn, getNewColumn())}>Nueva columna</button></li>
            </ul>
        </>
    )
}