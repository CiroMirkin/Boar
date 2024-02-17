import React from "react";
import { AllBoardData } from "./Board";
import { TaskList } from "./TaskListProps";
import { Column } from "./Column";

export function ColumnList({ }) {
    const columns = React.useContext(AllBoardData).columnList;
    const columnList: React.ReactNode[] = [];

    columns.forEach(column => {
        columnList.push(
            <Column data={column} key={column.id}>
                <TaskList columnPosition={column.position} />
            </Column>
        );
    });

    return (
        <div>
            {columnList}
        </div>
    );
}
