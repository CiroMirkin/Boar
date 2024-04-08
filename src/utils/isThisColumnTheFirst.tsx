import { ColumnListContext } from "@/components/board/Board";
import { columnModel, isThisTheFirstColumn } from "@/models/column";
import { useContext } from "react";

export function isThisColumnTheFirst( column: columnModel): boolean {
    const columnList = useContext(ColumnListContext)
    return isThisTheFirstColumn(column, columnList)
}