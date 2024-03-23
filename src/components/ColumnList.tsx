import React, { useContext } from "react";
import { Column } from "./Column";
import './ColumnList.css'
import { ColumnListContext } from "@/App";

interface ColumnListProps {
    columnsContent: React.ReactNode[]
}
export function ColumnList({ columnsContent }: ColumnListProps) {
    const columns = useContext(ColumnListContext)
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
