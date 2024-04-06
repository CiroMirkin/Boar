import React from "react"
import { boardModel } from "../../models/board"
import { ColumnList } from "./ColumnList"
import { columnList, defaultColumnList } from "@/models/column"
import { Header, USER_IS_IN } from "../Header"
import { TaskListInEachColumn } from "@/models/taskListInEachColumn"

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
        <Header title={data.name} whereUserIs={USER_IS_IN.BOARD} />
        <ColumnListContext.Provider value={columnList}>
            <TaskListInEachColumnContext.Provider value={taskListInEachColumn}>
                <ColumnList />
            </TaskListInEachColumnContext.Provider>
        </ColumnListContext.Provider>
        </>
    )
}