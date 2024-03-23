import React, { useContext } from "react"
import { boardModel } from "../models/board"
import { ColumnList } from "./ColumnList"
import { TaskList } from "./TaskList"
import { defaultColumnList } from "@/models/column"
import { TaskListInEachColumnContext } from "@/App"

interface BoardProps {
    children?: React.ReactNode
}

export function Board({}: BoardProps) {
    const data: boardModel = {
        id: '1',
        name: 'Tablero básico'
    }
    const columnsContent: React.ReactNode[] = []
    const taskListInEachColumn = useContext(TaskListInEachColumnContext);
    taskListInEachColumn.forEach(taskList => {
        columnsContent.push(
            <TaskList tasks={taskList} />
        )
    })
    return (
        <>
        <h1>{ data.name }</h1>
            <ColumnList columnsContent={columnsContent} />
        </>
    )
}