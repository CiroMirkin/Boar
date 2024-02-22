import React from "react";
import { AllBoardData } from "./Board";
import { TaskList } from "./TaskListProps";
import { Column } from "./Column";
import './ColumnList.css'

export function ColumnList({ }) {
    const columns = React.useContext(AllBoardData).columnList;
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