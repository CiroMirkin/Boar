import React from "react";
import { Column } from "./Column";
import './ColumnList.css'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ColumnListProps {
    columnsContent: React.ReactNode[]
}
export function ColumnList({ columnsContent }: ColumnListProps) {
    const columns = useSelector((state: RootState) => state.columnList)
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
