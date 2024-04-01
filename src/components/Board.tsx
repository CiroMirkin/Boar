import React from "react"
import { boardModel } from "../models/board"
import { ColumnList } from "./ColumnList"
import { TaskList } from "./TaskList"
import { taskList } from "@/models/task"
import { ScrollArea } from "../ui/scroll-area"
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
    const columnsContent: React.ReactNode[] = []
    taskListInEachColumn.forEach(taskList => {
        columnsContent.push(
            <ScrollArea className="h-full w-full rounded-md">
                <TaskList tasks={taskList} />
            </ScrollArea>
        )
    })
    return (
        <>
        <Header title={data.name} />
        <ColumnListContext.Provider value={columnList}>
            <TaskListInEachColumnContext.Provider value={taskListInEachColumn}>
                <ColumnList columnsContent={columnsContent} classNameOfColumnContent="min-h-80 md:h-[60vh] w-full" />
            </TaskListInEachColumnContext.Provider>
        </ColumnListContext.Provider>
        </>
    )
}