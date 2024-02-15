import React from "react"
import { Column } from "./Column"
import { BoardDataContext } from "./Board"
import { TaskList } from "./TaskList"

interface ColumnListProps {  }

export function ColumnList({  }: ColumnListProps) {
    const columns = React.useContext(BoardDataContext).columnList
    const columnList: React.ReactNode[] = []

    columns.forEach(column => {
        columnList.push(
            <Column data={column} key={column.id}>
                <TaskList columnPosition={column.position} />
            </Column>
        )
    })

    return (
        <div>
            { columnList }
        </div>
    )
}