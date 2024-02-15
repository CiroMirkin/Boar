import React from "react"
import { boardModel, defaultBoard } from "../models/board"

const BoardDataContext = React.createContext(defaultBoard as boardModel)

interface BoardProps {
    data: boardModel,
    children: React.ReactNode
}

export function Board({ data, children }: BoardProps) {
    console.log(data)
    return (
        <>
        <h1>{ data.boardData.name }</h1>
        <BoardDataContext.Provider value={data}>
            { children }
        </BoardDataContext.Provider>
        </>
    )
}