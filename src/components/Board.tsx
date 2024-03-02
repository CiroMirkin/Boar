import React from "react"
import { boardModel } from "../models/board"
import { ColumnList } from "./ColumnList"

interface BoardProps {
    data: boardModel,
    children?: React.ReactNode
}

export function Board({ data }: BoardProps) {
    return (
        <>
        <h1>{ data.boardData.name }</h1>
        <ColumnList />
        </>
    )
}