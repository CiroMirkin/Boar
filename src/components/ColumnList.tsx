import React from "react";
import { Column } from "./Column";
import './ColumnList.css'
import { defaultColumnList } from "@/models/column";

interface ColumnListProps {
    columnsContent: React.ReactNode[]
}
export function ColumnList({ columnsContent }: ColumnListProps) {
    const columns = defaultColumnList
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
