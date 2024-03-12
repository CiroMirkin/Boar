import React from "react";
import { BoardData } from "../App";
import { TaskList } from "./TaskList";
import { Column } from "./Column";
import './ColumnList.css'

export function ColumnList({ }) {
    const columns = React.useContext(BoardData).board.columnList;
    const columnList: React.ReactNode[] = [];

    columns.forEach(column => {
        columnList.push(
            <Column data={column} key={column.id}>
                <TaskList tasks={column.taskList} />
            </Column>
        );
    });

    return (
        <div className="column-list">
            {columnList}
        </div>
    );
}
