import React from "react"
import { boardModel } from "../models/board"
import { ColumnList } from "./ColumnList"
import { TaskList } from "./TaskList"

interface BoardProps {
    data: boardModel,
    children?: React.ReactNode
}

export function Board({ data }: BoardProps) {
    const columnsContent: React.ReactNode[] = []
    data.columnList.forEach(column => {
        columnsContent.push(
            <TaskList tasks={column.taskList} />
        )
    })
    return (
        <>
        <h1>{ data.boardData.name }</h1>
        <ColumnList columnsContent={columnsContent} />
        </>
    )
}