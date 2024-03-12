import React from "react"
import { AllBoardData, UpdateBoardData, boardActionFunction } from "../App"
import { addColumnAtTheEnd } from "../useCase/addColumn"
import { getBlankColumnWithoutPosition } from "../models/column"
import { deleteThisColumn } from "../useCase/deleteColumn"
import { columnModel } from "../models/column"

interface ConfigBoardParams {}

export function ConfigBoard({}:ConfigBoardParams) {
    const boardData = React.useContext(AllBoardData)
    const updateBoardData = React.useContext(UpdateBoardData)

    const getNewColumn = () => getBlankColumnWithoutPosition({ name: 'Nueva columna'})

    const handleClick = (action: boardActionFunction, column: columnModel) => {
        try {
            updateBoardData({ action, column })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1>Preferencias</h1>
            <div>
                <h2>{boardData.boardData.name}</h2>
            </div>
            <ul>
                {boardData.columnList.map(column =>
                    <li key={column.id}>
                        <h4>{column.name}</h4>
                        <button onClick={() => handleClick(deleteThisColumn, column)}>Eliminar</button>
                    </li>
                )}
                <li><button onClick={() => handleClick(addColumnAtTheEnd, getNewColumn())}>Nueva columna</button></li>
            </ul>
        </>
    )
}