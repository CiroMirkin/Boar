import React from "react";
import { columnModel } from "../models/column";
import { AllBoardData } from "./Board";
import { TaskList } from "./Task";

export function ColumnList({ }) {
    const columns = React.useContext(AllBoardData).columnList
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
            {columnList}
        </div>
    )
}

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    return (
        <div>
            <h3>{ data.name }</h3>
            { children }
        </div>
    )
}