import React from "react"
import { boardModel } from "../../model/board"
import { ColumnList } from "./ColumnList"
import { columnList, defaultColumnList } from "@/model/column"
import { Header } from "../Header"
import { TaskListInEachColumn } from "@/model/taskListInEachColumn"

export const TaskListInEachColumnContext = React.createContext([[], [], []] as TaskListInEachColumn)
export const ColumnListContext = React.createContext(defaultColumnList as columnList)

interface BoardProps {
    children?: React.ReactNode
    data: boardModel
    taskListInEachColumn: TaskListInEachColumn
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