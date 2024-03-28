import React from "react"
import { boardModel } from "../models/board"
import { ColumnList } from "./ColumnList"
import { TaskList } from "./TaskList"
import { taskList } from "@/models/task"
import { ScrollArea } from "./ui/scroll-area"

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
            <ScrollArea className="h-full w-full rounded-md">
                <TaskList tasks={taskList} />
            </ScrollArea>
        )
    })
    return (
        <>
            <TaskListInEachColumnContext.Provider value={taskListInEachColumn}>
                <ColumnList columnsContent={columnsContent} classNameOfColumnContent="min-h-80 md:h-[60vh] min-w-72 max-w-80" />
            </TaskListInEachColumnContext.Provider>
        </>
    )
}