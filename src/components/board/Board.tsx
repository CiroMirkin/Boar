import React, { useEffect } from "react"
import { boardModel } from "../../models/board"
import { ColumnList } from "./ColumnList"
import { defaultColumnList } from "@/models/columnList"
import { columnList } from "@/models/columnList"
import { Header } from "../Header"
import { USER_IS_IN } from "../userIsIn"
import { TaskListInEachColumn } from "@/models/taskListInEachColumn"
import { WelcomeDialog } from "./WelcomeDialog"
import LocalStorageTaskListInEachColumnRepository from "@/repositories/localStorageTaskLists.ts"
import { TaskListInEachColumnRepository } from "@/models/taskListInEachColumnRepository"

export const TaskListInEachColumnContext = React.createContext([[], [], []] as TaskListInEachColumn)
export const ColumnListContext = React.createContext(defaultColumnList as columnList)

const taskListInEachColumnRepository: TaskListInEachColumnRepository = new LocalStorageTaskListInEachColumnRepository();

interface BoardProps {
    children?: React.ReactNode
    data: boardModel
    taskListInEachColumn: TaskListInEachColumn
    columnList: columnList
}

export function Board({ data, taskListInEachColumn, columnList }: BoardProps) {
    useEffect(() => {
        taskListInEachColumnRepository.save(taskListInEachColumn)
    }, [taskListInEachColumn])

    return (
        <>
        <Header title={data.name} whereUserIs={USER_IS_IN.BOARD} />
        <ColumnListContext.Provider value={columnList}>
            <TaskListInEachColumnContext.Provider value={taskListInEachColumn}>
                <ColumnList />
            </TaskListInEachColumnContext.Provider>
        </ColumnListContext.Provider>
        <WelcomeDialog />
        </>
    )
}