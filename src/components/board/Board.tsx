import React from "react"
import { ColumnList } from "./ColumnList"
import { defaultColumnList } from "@/models/columnList"
import { ColumnList as columnListModel } from "@/models/columnList"
import { Header } from "../Header"
import { USER_IS_IN } from "../userIsIn"
import { WelcomeDialog } from "./WelcomeDialog"
import { useColumnList } from "@/hooks/useColumnList"
import { useBoard } from "@/hooks/useBoard"
import { TaskListInEachColumnProvider } from "@/contexts/TaskListInEachColumnContext"

export const ColumnListContext = React.createContext(defaultColumnList as columnListModel)

export function Board() {
    const columnList = useColumnList()
    const data = useBoard()

    return (
        <>
        <Header title={data.name} whereUserIs={USER_IS_IN.BOARD} />
        <ColumnListContext.Provider value={columnList}>
            <TaskListInEachColumnProvider>
                <ColumnList />
            </TaskListInEachColumnProvider>
        </ColumnListContext.Provider>
        <WelcomeDialog />
        </>
    )
}