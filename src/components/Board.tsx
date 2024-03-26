import React from "react"
import { boardModel } from "../models/board"
import { ColumnList } from "./ColumnList"
import { TaskList } from "./TaskList"
import { taskList } from "@/models/task"
import { Header } from "./Header"

export const TaskListInEachColumnContext = React.createContext([[], [], []] as taskList[])

interface BoardProps {
    children?: React.ReactNode
    data: boardModel
    taskListInEachColumn: taskList[]
}

export function Board({ data, taskListInEachColumn }: BoardProps) {
    const columnsContent: React.ReactNode[] = []
    taskListInEachColumn.forEach(taskList => {
        columnsContent.push(
            <TaskList tasks={taskList} />
        )
    })
    return (
        <>
            <Header title={data.name} />
            <TaskListInEachColumnContext.Provider value={taskListInEachColumn}>
                <ColumnList columnsContent={columnsContent} />
            </TaskListInEachColumnContext.Provider>
        </>
    )
}