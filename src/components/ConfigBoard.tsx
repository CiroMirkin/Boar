import React from "react"
import { BoardData, boardActionFunction } from "../App"
import { addColumnAtTheEnd } from "../useCase/addColumn"
import { getBlankColumnWithoutPosition } from "../models/column"
import { deleteThisColumn } from "../useCase/deleteColumn"
import { columnModel } from "../models/column"

interface ConfigBoardParams {}

export function ConfigBoard({}:ConfigBoardParams) {
    const { board, update } = React.useContext(BoardData)
    const updateBoardData = update
    const boardData = board
    
    const getNewColumn = () => getBlankColumnWithoutPosition({ name: 'Nueva columna'})

    const handleClick = (action: boardActionFunction, column: columnModel) => {
        try {
            updateBoardData({ action, column })
        }
        catch (error) {
            console.log(error)
        }
    }

    const columnsContent: React.ReactNode[] = boardData.columnList.map(column => 
        <button onClick={() => handleClick(deleteThisColumn, column)}>Eliminar</button>
    ) 

    const columns: React.ReactNode[] = boardData.columnList.map(column =>
        <li key={column.id}>
            <h4>{column.name}</h4>
            <button onClick={() => handleClick(deleteThisColumn, column)}>Eliminar</button>
        </li>
    )
    return (
        <>
            <h1>Preferencias</h1>
            <div>
                <h2>{boardData.boardData.name}</h2>
            </div>
            <ul>
                { columns }
                <li><button onClick={() => handleClick(addColumnAtTheEnd, getNewColumn())}>Nueva columna</button></li>
            </ul>
        </>
    )
}