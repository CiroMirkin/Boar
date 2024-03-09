import React from "react"
import { AllBoardData, UpdateBoardData } from "../App"
import { addColumnAtTheEnd, createColumnWithoutPosition } from "../useCase/createColumn"
import { deleteThisColumn } from "../useCase/deleteColumn"

interface ConfigBoardParams {}

export function ConfigBoard({}:ConfigBoardParams) {
    const boardData = React.useContext(AllBoardData)
    const updateBoardData = React.useContext(UpdateBoardData)

    const getNewColumn = () => createColumnWithoutPosition({ name: 'Nueva columna'})

    const handleClick = () => {
        const action = addColumnAtTheEnd
        const column = getNewColumn()
        updateBoardData({ action, column })
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
                        <button onClick={() => {
                            try { updateBoardData({ action: deleteThisColumn, column }) }
                            catch(e) { console.error(e) }
                        }}>Eliminar</button>
                    </li>
                )}
                <li><button onClick={handleClick}>Nueva columna</button></li>
            </ul>
        </>
    )
}