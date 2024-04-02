import React from "react"
import { boardModel } from "../models/board"
import { ColumnList } from "./ColumnList"
import { taskList } from "@/models/task"
import { columnList, defaultColumnList } from "@/models/column"
import { Header } from "./Header"

export const TaskListInEachColumnContext = React.createContext([[], [], []] as taskList[])
export const ColumnListContext = React.createContext(defaultColumnList as columnList)

interface BoardProps {
    children?: React.ReactNode
    data: boardModel
    taskListInEachColumn: taskList[]
    columnList: columnList
}

export function Board({ data, taskListInEachColumn, columnList }: BoardProps) {
    
    return (
        <>
        <Header title={data.name} />
        <ColumnListContext.Provider value={columnList}>
            <TaskListInEachColumnContext.Provider value={taskListInEachColumn}>
                <ColumnList />
            </TaskListInEachColumnContext.Provider>
        </ColumnListContext.Provider>
        </>
    )
}