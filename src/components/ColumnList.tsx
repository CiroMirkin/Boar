import React, { useContext } from "react";
import { Column } from "./Column";
import './ColumnList.css'
import { ColumnListContext } from "@/App";

interface ColumnListProps {
    columnsContent: React.ReactNode[]
    classNameOfColumnContent?: string
}
export function ColumnList({ columnsContent, classNameOfColumnContent }: ColumnListProps) {
    const columns = useContext(ColumnListContext)
    const columnList: React.ReactNode[] = [];

    columns.forEach((column, columnIndex) => {
        columnList.push(
            <Column data={column} key={column.id}>
                <Column.ColumnContent className={classNameOfColumnContent && classNameOfColumnContent}>
                    { columnsContent[columnIndex] && columnsContent[columnIndex] }
                </Column.ColumnContent>
                <Column.Footer/>
            </Column>
        );
    });

    return (
        <div className="h-auto my-5 mx-6 flex flex-wrap gap-y-3 gap-x-3.5">
            {columnList}
        </div>
    );
}
