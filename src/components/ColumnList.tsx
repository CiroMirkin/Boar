import React from "react";
import { BoardData } from "../App";
import { TaskList } from "./TaskList";
import { Column } from "./Column";
import './ColumnList.css'

export function ColumnList({ }) {
    const columns = React.useContext(BoardData).board.columnList;
    const columnList: React.ReactNode[] = [];
    const columnsContent: React.ReactNode[] = []

    columns.forEach(column => {
        columnsContent.push(
            <TaskList tasks={column.taskList} />
        )
    })

    columns.forEach((column, columnIndex) => {
        columnList.push(
            <Column data={column} key={column.id}>
                { columnsContent[columnIndex] && columnsContent[columnIndex] }
            </Column>
        );
    });

    return (
        <div className="column-list">
            {columnList}
        </div>
    );
}
