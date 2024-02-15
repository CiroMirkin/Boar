import React from "react"
import { Column } from "./Column"
import { BoardDataContext } from "./Board"

interface ColumnListProps {  }

export function ColumnList({  }: ColumnListProps) {
    const columns = React.useContext(BoardDataContext).columnList
    const columnList: React.ReactNode[] = []

    columns.forEach(column => {
        columnList.push(
            <Column data={column} />
        )
    })

    return (
        <div>
            { columnList }
        </div>
    )
}