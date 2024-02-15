import React from "react"
import { columnModel } from "../models/column"
import { Column } from "./Column"

interface ColumnListProps {
    columns: columnModel[]
}

export function ColumnList({ columns }: ColumnListProps) {
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