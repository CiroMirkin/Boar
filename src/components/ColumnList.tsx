import React from "react";
import { BoardData } from "../App";
import { Column } from "./Column";
import './ColumnList.css'

interface ColumnListProps {
    columnsContent: React.ReactNode[]
}
export function ColumnList({ columnsContent }: ColumnListProps) {
    const columns = React.useContext(BoardData).board.columnList;
    const columnList: React.ReactNode[] = [];

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
