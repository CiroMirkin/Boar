import React, { useEffect } from "react"
import { ColumnList } from "./ColumnList"
import { defaultColumnList } from "@/models/columnList"
import { ColumnList as columnListModel } from "@/models/columnList"
import { Header } from "../Header"
import { USER_IS_IN } from "../userIsIn"
import { TaskListInEachColumn } from "@/models/taskList"
import { WelcomeDialog } from "./WelcomeDialog"
import LocalStorageTaskListInEachColumnRepository from "@/repositories/localStorageTaskLists.ts"
import { TaskListInEachColumnRepository } from "@/models/taskListInEachColumnRepository"
import { useColumnList } from "@/hooks/getColumnList"
import { useTaskListInEachColumn } from "@/hooks/getTaskListInEachColumn"
import { useBoard } from "@/hooks/useBoard"

export const TaskListInEachColumnContext = React.createContext([[], [], []] as TaskListInEachColumn)
export const ColumnListContext = React.createContext(defaultColumnList as columnListModel)

const taskListInEachColumnRepository: TaskListInEachColumnRepository = new LocalStorageTaskListInEachColumnRepository();

export function Board() {
    const columnList = useColumnList()
    const taskListInEachColumn = useTaskListInEachColumn()
    const data = useBoard()
    
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