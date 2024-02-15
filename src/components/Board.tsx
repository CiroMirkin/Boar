import React, { useState } from "react"
import { boardModel, defaultBoard } from "../models/board"
import { ColumnList } from "./ColumnList"

export const BoardDataContext = React.createContext(defaultBoard as boardModel)

interface BoardProps {
    data: boardModel,
    children?: React.ReactNode
}

export function Board({ data }: BoardProps) {
    const [ allBoardData, setAllBoardData ] = useState(data)
    console.log(data)
    return (
        <>
        <h1>{ data.boardData.name }</h1>
        <BoardDataContext.Provider value={allBoardData}>
            <ColumnList />
        </BoardDataContext.Provider>
        </>
    )
}