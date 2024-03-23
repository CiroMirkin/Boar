import React from "react"
import { boardModel } from "../models/board"
import { ColumnList } from "./ColumnList"
import { TaskList } from "./TaskList"
import { defaultColumnList } from "@/models/column"

interface BoardProps {
    children?: React.ReactNode
}

export function Board({}: BoardProps) {
    const data: boardModel = {
        id: '1',
        name: 'Tablero básico'
    }
    const columnsContent: React.ReactNode[] = []
    const columnList = defaultColumnList;
    columnList.forEach(column => {
        columnsContent.push(
            <TaskList tasks={[]} />
        )
    })
    return (
        <>
        <h1>{ data.name }</h1>
            <ColumnList columnsContent={columnsContent} />
        </>
    )
}