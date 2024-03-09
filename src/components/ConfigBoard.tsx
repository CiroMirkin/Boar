import React from "react"
import { AllBoardData, UpdateBoardData } from "../App"
import { addColumnAtTheEnd, createColumnWithoutPosition } from "../useCase/createColumn"

interface ConfigBoardParams {}

export function ConfigBoard({}:ConfigBoardParams) {
    const boardData = React.useContext(AllBoardData)
    const updateBoardData = React.useContext(UpdateBoardData)

    const handleClick = () => {
        const column = createColumnWithoutPosition({ name: 'Nueva columna'})
        updateBoardData({ action: addColumnAtTheEnd, column })
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
                    </li>
                )}
                <li><button onClick={handleClick}>Nueva columna</button></li>
            </ul>
        </>
    )
}