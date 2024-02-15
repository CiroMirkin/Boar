import React from "react"
import { boardModel, defaultBoard } from "../models/board"
import { ColumnList } from "./ColumnList"

export const BoardDataContext = React.createContext(defaultBoard as boardModel)

interface BoardProps {
    data: boardModel,
    children?: React.ReactNode
}

export function Board({ data }: BoardProps) {
    console.log(data)
    return (
        <>
        <h1>{ data.boardData.name }</h1>
        <BoardDataContext.Provider value={data}>
            <ColumnList />
        </BoardDataContext.Provider>
        </>
    )
}