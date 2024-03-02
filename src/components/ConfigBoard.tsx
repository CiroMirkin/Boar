import React from "react"
import { AllBoardData } from "../App"

interface ConfigBoardParams {}

export function ConfigBoard({}:ConfigBoardParams) {
    const boardData = React.useContext(AllBoardData)

    return (
        <>
            <h1>Preferencias</h1>
            <div>
                <h2>{boardData.boardData.name}</h2>
            </div>
        </>
    )
}